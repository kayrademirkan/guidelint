import type { Translations } from "./index.js";

export const tr: Translations = {
  ui: {
    scanTitle: "guidelint",
    platform: "Platform",
    filesScanned: "dosya tarandı",
    rulesChecked: "kural kontrol edildi",
    noIssues: "Hiçbir sorun bulunamadı — harika!",
    score: "SKOR",
    verdictReady: "HAZIR — Gönderilebilir",
    verdictRisky: "RİSKLİ — Sorunları gözden geçir",
    verdictNotReady: "HAZIR DEĞİL — Kritik sorunlar çözülmeli",
    fix: "Çözüm",
    file: "Dosya",
    severity: "Önem",
    category: "Kategori",
    problem: "Sorun",
    guideline: "Kılavuz",
    docs: "Dokümantasyon",
    reportTitle: "Guidelint — App Store / Google Play Gönderim Öncesi Raporu",
    projectInfo: "Proje Bilgisi",
    path: "Yol",
    scanDate: "Tarama tarihi",
    findings: "Bulgular",
    findingsDescription:
      "Aşağıda tespit edilen sorunlar listelenmiştir. Her biri kural ID'si, önem derecesi, sorun açıklaması ve çözüm içerir.",
    aiFix: "AI Düzeltme Talimatları",
    aiFixStep1:
      "Adım 1: Kritik Sorunları Düzelt (göndermeden önce zorunlu)",
    aiFixStep2:
      "Adım 2: Yüksek Önemli Sorunları Düzelt (şiddetle önerilir)",
    aiFixStep3: "Adım 3: Orta/Düşük Sorunları Gözden Geçir (iyi olur)",
    readyForSubmission: "Gönderime hazır",
    riskyReview: "Riskli — göndermeden önce sorunları gözden geçir",
    notReadyCritical: "Hazır değil — kritik sorunlar düzeltilmeli",
    noIssuesFound:
      "Sorun bulunamadı. Proje gönderime hazır görünüyor.",
  },
  rules: {
    // ── iOS Kuralları ──
    "IOS-PLIST-001": {
      title: "Info.plist bulunamadı",
      message: "Info.plist dosyası bulunamadı",
      fix: "Xcode'da Target > Info sekmesinden oluştur",
    },
    "IOS-PRIV-100": {
      title: "PrivacyInfo.xcprivacy bulunamadı",
      message:
        "PrivacyInfo.xcprivacy dosyası eksik. Mayıs 2024'ten itibaren zorunlu.",
      fix: "Xcode > New File > iOS > Resource > App Privacy ile oluştur",
    },
    "IOS-PRIV-101": {
      title: "PrivacyInfo.xcprivacy zorunlu key eksik",
      message: "PrivacyInfo.xcprivacy'de eksik key'ler: {keys}",
      fix: "Tüm zorunlu key'leri PrivacyInfo.xcprivacy dosyasına ekle",
    },
    "IOS-PRIV-001": {
      title: "NSCameraUsageDescription eksik",
      message:
        "Kamera kullanımı tespit edildi ama Info.plist'te NSCameraUsageDescription yok",
      fix: "Info.plist'e <key>NSCameraUsageDescription</key><string>Kamerayı neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-002": {
      title: "NSMicrophoneUsageDescription eksik",
      message:
        "Mikrofon kullanımı tespit edildi ama Info.plist'te NSMicrophoneUsageDescription yok",
      fix: "Info.plist'e <key>NSMicrophoneUsageDescription</key><string>Mikrofonu neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-003": {
      title: "NSLocationWhenInUseUsageDescription eksik",
      message:
        "Konum servisi kullanılıyor ama Info.plist'te NSLocationWhenInUseUsageDescription yok",
      fix: "Info.plist'e <key>NSLocationWhenInUseUsageDescription</key><string>Konumu neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-004": {
      title: "NSPhotoLibraryUsageDescription eksik",
      message:
        "Fotoğraf kütüphanesi erişimi var ama Info.plist'te NSPhotoLibraryUsageDescription yok",
      fix: "Info.plist'e <key>NSPhotoLibraryUsageDescription</key><string>Fotoğraflara neden eriştiğinizi açıklayın</string> ekle",
    },
    "IOS-PRIV-005": {
      title: "NSContactsUsageDescription eksik",
      message:
        "Rehber erişimi var ama Info.plist'te NSContactsUsageDescription yok",
      fix: "Info.plist'e <key>NSContactsUsageDescription</key><string>Rehbere neden eriştiğinizi açıklayın</string> ekle",
    },
    "IOS-PRIV-006": {
      title: "NSBluetoothAlwaysUsageDescription eksik",
      message:
        "Bluetooth kullanımı var ama Info.plist'te NSBluetoothAlwaysUsageDescription yok",
      fix: "Info.plist'e <key>NSBluetoothAlwaysUsageDescription</key><string>Bluetooth'u neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-007": {
      title: "NSFaceIDUsageDescription eksik",
      message:
        "Biyometrik kimlik doğrulama var ama Info.plist'te NSFaceIDUsageDescription yok",
      fix: "Info.plist'e <key>NSFaceIDUsageDescription</key><string>Face ID'yi neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-008": {
      title: "NSCalendarsUsageDescription eksik",
      message:
        "Takvim erişimi var ama Info.plist'te NSCalendarsUsageDescription yok",
      fix: "Info.plist'e <key>NSCalendarsUsageDescription</key><string>Takvime neden eriştiğinizi açıklayın</string> ekle",
    },
    "IOS-PRIV-009": {
      title: "NSMotionUsageDescription eksik",
      message:
        "Hareket sensörü erişimi var ama Info.plist'te NSMotionUsageDescription yok",
      fix: "Info.plist'e <key>NSMotionUsageDescription</key><string>Hareket sensörünü neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-010": {
      title: "NSSpeechRecognitionUsageDescription eksik",
      message:
        "Konuşma tanıma kullanımı var ama Info.plist'te NSSpeechRecognitionUsageDescription yok",
      fix: "Info.plist'e <key>NSSpeechRecognitionUsageDescription</key><string>Konuşma tanımayı neden kullandığınızı açıklayın</string> ekle",
    },
    "IOS-PRIV-200": {
      title: "AppTrackingTransparency framework eksik",
      message:
        "IDFA/izleme kullanımı tespit edildi ama AppTrackingTransparency framework yok",
      fix: "AppTrackingTransparency import et ve ATTrackingManager.requestTrackingAuthorization çağır",
    },
    "IOS-PRIV-201": {
      title: "NSUserTrackingUsageDescription eksik",
      message:
        "ATT framework kullanılıyor ama Info.plist'te NSUserTrackingUsageDescription yok",
      fix: "Info.plist'e NSUserTrackingUsageDescription ekle",
    },
    "IOS-PRIV-300": {
      title: "Hesap silme özelliği bulunamadı",
      message:
        "Kullanıcı girişi tespit edildi ama hesap silme özelliği bulunamadı",
      fix: "Uygulama içinden hesap silme akışı ekle (e-posta yeterli değil, in-app olmalı)",
    },
    "IOS-PRIV-400": {
      title: "Düşük kaliteli kullanım açıklaması",
      message: 'Kullanım açıklaması çok kısa veya genel: "{value}"',
      fix: "Spesifik ve anlamlı bir açıklama yaz. Örn: 'Profil fotoğrafı çekebilmeniz için kameranıza erişiyoruz'",
    },
    "IOS-SEC-001": {
      title: "App Transport Security tamamen açık",
      message:
        "NSAllowsArbitraryLoads=true — tüm HTTP trafiğine izin verilmiş",
      fix: "NSAllowsArbitraryLoads'ı kaldır, gerekli domain'ler için NSExceptionDomains kullan",
    },
    "IOS-META-001": {
      title: "Bundle ID test/example domain içeriyor",
      message: 'Bundle ID "{bundleId}" test/example domain içeriyor',
      fix: "Gerçek domain ile değiştir (com.sirketadi.uygulamaadi)",
    },
    "IOS-IAP-001": {
      title: "StoreKit var, Restore Purchases yok",
      message:
        "StoreKit import edilmiş ama Restore Purchases implementasyonu bulunamadı",
      fix: "Restore Purchases butonu ve SKPaymentQueue.restoreCompletedTransactions() veya StoreKit 2 Transaction.all ekle",
    },
    "IOS-CRASH-001": {
      title: "Force unwrap (!) kullanımı",
      message: "{count} adet force unwrap (!) tespit edildi — çökme riski",
      fix: "guard let / if let veya nil coalescing (??) kullan",
    },
    "IOS-CRASH-002": {
      title: "fatalError() production kodda",
      message: "fatalError() çağrısı production kodda çökmeye neden olur",
      fix: "fatalError() yerine uygun hata yönetimi (throw, assertionFailure, vb.) kullan",
    },

    // ── Android Kuralları ──
    "AND-MANIF-001": {
      title: "AndroidManifest.xml bulunamadı",
      message: "AndroidManifest.xml dosyası bulunamadı",
      fix: "app/src/main/AndroidManifest.xml oluştur",
    },
    "AND-MANIF-100": {
      title: "Tehlikeli izin: READ_SMS",
      message: "READ_SMS — Play Console'da özel beyan gerektirir",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-101": {
      title: "Tehlikeli izin: READ_CALL_LOG",
      message: "READ_CALL_LOG — Play Console'da özel beyan gerektirir",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-102": {
      title: "Tehlikeli izin: PROCESS_OUTGOING_CALLS",
      message: "PROCESS_OUTGOING_CALLS — kullanımdan kaldırıldı ve yasaklandı",
      fix: "Bu izni tamamen kaldır",
    },
    "AND-MANIF-103": {
      title: "Tehlikeli izin: BIND_ACCESSIBILITY_SERVICE",
      message:
        "BIND_ACCESSIBILITY_SERVICE — çok sıkı incelemeye tabi",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-104": {
      title: "Tehlikeli izin: ACCESS_BACKGROUND_LOCATION",
      message: "ACCESS_BACKGROUND_LOCATION — ek onay gerektirir",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-105": {
      title: "Tehlikeli izin: MANAGE_EXTERNAL_STORAGE",
      message: "MANAGE_EXTERNAL_STORAGE — sıkı incelemeye tabi",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-106": {
      title: "Tehlikeli izin: REQUEST_INSTALL_PACKAGES",
      message:
        "REQUEST_INSTALL_PACKAGES — güvenlik incelemesi gerektirir",
      fix: "Bu izin gerçekten gerekli mi kontrol et. Gerekliyse Play Console'da beyan formunu doldur",
    },
    "AND-MANIF-200": {
      title: "android:exported belirtilmemiş",
      message:
        "Component'te android:exported belirtilmemiş — Android 12+ için zorunlu",
      fix: 'Tüm activity, service ve receiver\'lara android:exported="true" veya "false" ekle',
    },
    "AND-SEC-001": {
      title: "Cleartext HTTP trafiği açık",
      message: "usesCleartextTraffic=true — HTTP trafiğine izin verilmiş",
      fix: "usesCleartextTraffic kaldır veya network_security_config.xml ile domain bazlı yönet",
    },
    "AND-SEC-100": {
      title: "Yasaklı cihaz kimliği kullanımı",
      message: "IMEI/DeviceId/MAC erişimi — Google Play'de yasaklı",
      fix: "AdvertisingIdClient veya Firebase Instance ID kullan",
    },
    "AND-GRADLE-001": {
      title: "targetSdkVersion düşük",
      message:
        "targetSdkVersion {version} — Google Play yeni uygulamalar için 35 gerektiriyor",
      fix: "targetSdkVersion'ı 35'e yükselt",
    },
    "AND-GRADLE-002": {
      title: "compileSdk düşük",
      message: "compileSdk {version} — en az 34 olmalı",
      fix: "compileSdk'yı 35'e yükselt",
    },
    "AND-GRADLE-003": {
      title: "Release build debuggable",
      message: "Release build'da debuggable=true — güvenlik riski",
      fix: "Release build type'da debuggable=false yap",
    },
    "AND-GRADLE-004": {
      title: "Release minification kapalı",
      message: "Release build'da minifyEnabled=false — kod korumasız",
      fix: "minifyEnabled=true yap ve ProGuard kurallarını ayarla",
    },
    "AND-CRASH-001": {
      title: "PendingIntent flag eksik",
      message:
        "PendingIntent FLAG_IMMUTABLE/FLAG_MUTABLE belirtilmemiş — Android 12+ çökmesi",
      fix: "PendingIntent.FLAG_IMMUTABLE veya FLAG_MUTABLE ekle",
    },
    "AND-PRIV-001": {
      title: "Gizlilik politikası referansı bulunamadı",
      message:
        "Gizlilik politikası URL'i veya referansı bulunamadı — Google Play'de zorunlu",
      fix: "Gizlilik politikası URL'ini uygulamaya ve Play Console listesine ekle",
    },
    "AND-PRIV-002": {
      title: "Hesap silme özelliği bulunamadı",
      message:
        "Kullanıcı girişi tespit edildi ama hesap silme özelliği bulunamadı",
      fix: "Uygulama içinden hesap silme akışı ekle — Google Play'de zorunlu",
    },

    // ── Ortak Kurallar ──
    "COM-SEC-001": {
      title: "Sabitlenmiş API anahtarı/gizli bilgi tespit edildi",
      message: "Kaynak kodda sabitlenmiş API anahtarı veya gizli bilgi bulundu",
      fix: "Ortam değişkenleri, .env dosyası veya platform gizli bilgi yöneticisi (Keychain/EncryptedSharedPreferences) kullan",
    },
    "COM-SEC-002": {
      title: "HTTP URL kullanımı",
      message: "HTTP URL tespit edildi — HTTPS kullanılmalı",
      fix: "Tüm URL'leri HTTPS'e çevir",
    },
    "COM-SEC-003": {
      title: "Hassas veri loglama riski",
      message:
        "Log/print ifadesinde hassas veri (şifre, token, vb.) tespit edildi",
      fix: "Hassas verileri asla loglama",
    },
    "COM-META-001": {
      title: "Lorem ipsum placeholder içerik",
      message:
        "Lorem ipsum placeholder içerik tespit edildi — mağaza incelemesinde reddedilir",
      fix: "Gerçek içerikle değiştir",
    },
    "COM-META-002": {
      title: "Placeholder görsel dosya adı",
      message: "Placeholder/test görsel dosyası tespit edildi",
      fix: "Gerçek görsellerle değiştir",
    },
    "COM-META-003": {
      title: "TODO/FIXME yorumları",
      message:
        "{count} adet TODO/FIXME yorum tespit edildi — çözülmemiş sorunlar olabilir",
      fix: "Göndermeden önce tüm TODO/FIXME yorumlarını gözden geçir",
    },
    "COM-META-004": {
      title: "Debug print ifadeleri",
      message:
        "{count} adet debug print/log ifadesi — release build'da kaldırılmalı",
      fix: "Release build'da print/log ifadelerini kaldır veya koşullu yap",
    },
    "COM-CRASH-001": {
      title: "Boş catch bloğu",
      message:
        "{count} adet boş catch bloğu — hatalar sessizce yutulabilir",
      fix: "Hataları logla veya kullanıcıya bildir, sessizce yutma",
    },
  },
};
