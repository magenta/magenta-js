"""A script to produce the coefficients in mel_sparse_coeffs.ts.

Rather than recompute the Mel2Linear coefficients in javascript each time, we
save them as a large array in mel_sparse_coeffs.ts. When you run this scipt it
outputs to stdout a list of lists, with each list containing sparse information
[x_idx, y_idx, value].

Example usage:
$ python gansynth_make_mel_sparse_coeffs.py >> mel_sparse_coeffs.ts'
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
import matplotlib.pyplot as plt

MEL_BREAK_FREQUENCY_HERTZ = 700.0
MEL_HIGH_FREQUENCY_Q = 1127.0

NUM_MEL_BINS = 1024
NUM_SPECTROGRAM_BINS = 1024
SAMPLE_RATE = 16000
NYQUIST_HERTZ = SAMPLE_RATE / 2.0
LOWER_EDGE_HERTZ = 0.0
UPPER_EDGE_HERTZ = NYQUIST_HERTZ


def mel_to_hertz(mel_values):
  """Converts frequencies in `mel_values` from the mel scale to linear scale."""
  return MEL_BREAK_FREQUENCY_HERTZ * (
      np.exp(mel_values / MEL_HIGH_FREQUENCY_Q) - 1.0)


def hertz_to_mel(frequencies_hertz):
  """Converts frequencies in `frequencies_hertz` in Hertz to the mel scale."""
  return MEL_HIGH_FREQUENCY_Q * np.log(
      1.0 + (frequencies_hertz / MEL_BREAK_FREQUENCY_HERTZ))


def main():
  # HTK excludes the spectrogram DC bin.
  bands_to_zero = 1
  linear_frequencies = np.linspace(
      0.0, NYQUIST_HERTZ, NUM_SPECTROGRAM_BINS)[bands_to_zero:, np.newaxis]

  # Compute NUM_MEL_BINS triples of (lower_edge, center, upper_edge). The
  # center of each band is the lower and upper edge of the adjacent bands.
  # Accordingly, we divide [LOWER_EDGE_HERTZ, UPPER_EDGE_HERTZ] into
  # NUM_MEL_BINS + 2 pieces.
  band_edges_mel = np.linspace(
      hertz_to_mel(LOWER_EDGE_HERTZ), hertz_to_mel(UPPER_EDGE_HERTZ),
      NUM_MEL_BINS + 2)

  lower_edge_mel = band_edges_mel[0:-2]
  center_mel = band_edges_mel[1:-1]
  upper_edge_mel = band_edges_mel[2:]

  freq_res = NYQUIST_HERTZ / float(NUM_SPECTROGRAM_BINS)
  freq_th = 1.5 * freq_res

  center_hz = center_mel.copy()
  center_hz = mel_to_hertz(center_mel)

  for i in range(NUM_MEL_BINS):
    center_hz = mel_to_hertz(center_mel[i])
    lower_hz = mel_to_hertz(lower_edge_mel[i])
    upper_hz = mel_to_hertz(upper_edge_mel[i])
    if upper_hz - lower_hz < freq_th:
      rhs = 0.5 * freq_th / (center_hz + MEL_BREAK_FREQUENCY_HERTZ)
      dm = MEL_HIGH_FREQUENCY_Q * np.log(rhs + np.sqrt(1.0 + rhs**2))
      lower_edge_mel[i] = center_mel[i] - dm
      upper_edge_mel[i] = center_mel[i] + dm

  lower_edge_hz = mel_to_hertz(lower_edge_mel)[np.newaxis, :]
  center_hz = mel_to_hertz(center_mel)[np.newaxis, :]
  upper_edge_hz = mel_to_hertz(upper_edge_mel)[np.newaxis, :]

  # Calculate lower and upper slopes for every spectrogram bin.
  # Line segments are linear in the mel domain, not Hertz.
  lower_slopes = (linear_frequencies - lower_edge_hz) / (
      center_hz - lower_edge_hz)
  upper_slopes = (upper_edge_hz - linear_frequencies) / (
      upper_edge_hz - center_hz)

  # Intersect the line segments with each other and zero.
  mel_weights_matrix = np.maximum(0.0, np.minimum(lower_slopes, upper_slopes))

  # Re-add the zeroed lower bins we sliced out above.
  # [freq, mel]
  mel_weights_matrix = np.pad(mel_weights_matrix, [[bands_to_zero, 0], [0, 0]],
                              'constant')

  w_linear2mel = mel_weights_matrix

  m_t = np.transpose(w_linear2mel)
  p = np.dot(w_linear2mel, m_t)
  d = [1.0 / x if np.abs(x) > 1.0e-8 else x for x in np.sum(p, axis=0)]
  w_mel2linear = np.dot(m_t, np.diag(d))

  w = w_mel2linear

  row, col = np.where(w != 0.0)
  w_sparse = [[row[i], col[i], w[row[i], col[i]]] for i in range(len(row))]
  np.set_printoptions(threshold=np.inf)

  for l in w_sparse:
    print(l, ',')


if __name__ == "__main__":
  main()
