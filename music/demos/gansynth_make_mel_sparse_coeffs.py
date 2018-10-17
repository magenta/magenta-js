import numpy as np
import matplotlib.pyplot as plt

_MEL_BREAK_FREQUENCY_HERTZ = 700.0
_MEL_HIGH_FREQUENCY_Q = 1127.0


def mel_to_hertz(mel_values):
  """Converts frequencies in `mel_values` from the mel scale to linear scale."""
  return _MEL_BREAK_FREQUENCY_HERTZ * (
      np.exp(mel_values / _MEL_HIGH_FREQUENCY_Q) - 1.0)


def hertz_to_mel(frequencies_hertz):
  """Converts frequencies in `frequencies_hertz` in Hertz to the mel scale."""
  return _MEL_HIGH_FREQUENCY_Q * np.log(
      1.0 + (frequencies_hertz / _MEL_BREAK_FREQUENCY_HERTZ))


num_mel_bins=1024
num_spectrogram_bins=1024
sample_rate=16000
lower_edge_hertz=0.0
upper_edge_hertz=16000.0

# HTK excludes the spectrogram DC bin.
bands_to_zero = 1
nyquist_hertz = sample_rate / 2.0
linear_frequencies = np.linspace(
    0.0, nyquist_hertz, num_spectrogram_bins)[bands_to_zero:, np.newaxis]
# spectrogram_bins_mel = hertz_to_mel(linear_frequencies)

# Compute num_mel_bins triples of (lower_edge, center, upper_edge). The
# center of each band is the lower and upper edge of the adjacent bands.
# Accordingly, we divide [lower_edge_hertz, upper_edge_hertz] into
# num_mel_bins + 2 pieces.
band_edges_mel = np.linspace(
    hertz_to_mel(lower_edge_hertz), hertz_to_mel(upper_edge_hertz),
    num_mel_bins + 2)

lower_edge_mel = band_edges_mel[0:-2]
center_mel = band_edges_mel[1:-1]
upper_edge_mel = band_edges_mel[2:]

freq_res = nyquist_hertz / float(num_spectrogram_bins)
freq_th = 1.5 * freq_res

center_hz = center_mel.copy()
center_hz = mel_to_hertz(center_mel)

# rhs = 0.5 * freq_th / (center_hz + _MEL_BREAK_FREQUENCY_HERTZ)
# dm = _MEL_HIGH_FREQUENCY_Q * np.log(rhs + np.sqrt(1.0 + rhs**2))
# diff = mel_to_hertz(upper_edge_mel.copy()) - mel_to_hertz(lower_edge_mel.copy())
# idx = np.where(diff < freq_th)
# lower_edge_mel = np.concatenate([center_hz[idx].shape - dm[idx], lower_edge_mel[(idx + 1) % 2]])
# upper_edge_mel[idx] = center_hz[idx] + dm[idx]

for i in range(0, num_mel_bins):
  center_hz = mel_to_hertz(center_mel[i])
  lower_hz = mel_to_hertz(lower_edge_mel[i])
  upper_hz = mel_to_hertz(upper_edge_mel[i])
  if upper_hz - lower_hz < freq_th:
    rhs = 0.5 * freq_th / (center_hz + _MEL_BREAK_FREQUENCY_HERTZ)
    dm = _MEL_HIGH_FREQUENCY_Q * np.log(rhs + np.sqrt(1.0 + rhs**2))
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
p = np.matmul(w_linear2mel, m_t)
d = [1.0 / x if np.abs(x) > 1.0e-8 else x for x in np.sum(p, axis=0)]
w_mel2linear = np.matmul(m_t, np.diag(d))

w = w_mel2linear

row, col = np.where(w != 0.0)
w_sparse = [[row[i], col[i], w[row[i], col[i]]] for i in range(len(row))]
# np.set_printoptions(threshold=np.inf)

for l in w_sparse:
  print l, ','
