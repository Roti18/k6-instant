# K6 Load Testing Project

Project ini dirancang untuk menjalankan pengujian beban (load testing) menggunakan k6 dengan cara yang instan, fleksibel, dan memiliki laporan visual yang premium.

## Persyaratan
- k6 terinstal di sistem Anda (dapat diakses melalui command line).
- PowerShell atau Command Prompt.

## Struktur Project
- tests/: Berisi konfigurasi beban kerja (smoke, slow, hard).
- utils/: Berisi helper untuk HTTP, variabel lingkungan, dan generator laporan.
- reports/: Lokasi penyimpanan hasil pengujian (HTML dan JSON).
- k6.bat/: Command wrapper utama untuk menjalankan pengujian.

## Cara Penggunaan

Gunakan perintah `.\k6` dengan format berikut:

```bash
.\k6 [nama_test] [url_target] [daftar_endpoint] [api_key]
```

### Contoh Perintah

1. Menjalankan Smoke Test pada Root:
```bash
.\k6 smoke http://localhost:3000
```

2. Menjalankan Test pada Banyak Endpoint Sekaligus:
```bash
.\k6 smoke http://localhost:3000 tracks,albums,users
```

3. Menjalankan Test dengan API Key:
```bash
.\k6 smoke http://localhost:3000 tracks,albums secret123
```

4. Menjalankan Hard Test (Stress Test) untuk spesifik endpoint:
```bash
.\k6 hard http://localhost:3000 login,profile
```

5. Membersihkan Folder Laporan:
```bash
.\k6 clean
```


## Jenis Pengujian (Test Profiles)
- smoke: 1 user, durasi 10 detik. Cocok untuk verifikasi cepat.
- slow: Konfigurasi constant arrival rate. Cocok untuk menguji stabilitas jangka panjang.
- hard: Stress test dengan peningkatan beban bertahap hingga beban sangat tinggi.
- spike: Lonjakan trafik tiba-tiba untuk menguji ketahanan server terhadap kejutan.
- soak: Beban menengah dalam durasi lama untuk mencari kebocoran memori (memory leak).


## Laporan Pengujian
Setiap kali pengujian selesai, sistem akan otomatis memperbarui laporan visual di:
reports/summary.html

Buka file tersebut di browser untuk melihat statistik latency (P95), success rate, dan metrik lainnya dengan tampilan dark mode yang modern.

## Konfigurasi Default
Jika argumen tidak diisi lengkap, sistem menggunakan nilai default berikut:
- Nama Test: (Wajib diisi)
- URL Target: (Wajib diisi)
- Daftar Endpoint: / (root)
- API Key: Menggunakan nilai default di utils/env.js
