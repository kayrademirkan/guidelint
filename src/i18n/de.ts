import type { Translations } from "./index.js";

export const de: Translations = {
  ui: {
    scanTitle: "guidelint",
    platform: "Plattform",
    filesScanned: "Dateien gescannt",
    rulesChecked: "Regeln geprüft",
    noIssues: "Keine Probleme gefunden — sieht gut aus!",
    score: "BEWERTUNG",
    verdictReady: "BEREIT — Kann eingereicht werden",
    verdictRisky: "RISKANT — Probleme vor dem Einreichen prüfen",
    verdictNotReady: "NICHT BEREIT — Kritische Probleme müssen behoben werden",
    fix: "Lösung",
    file: "Datei",
    severity: "Schweregrad",
    category: "Kategorie",
    problem: "Problem",
    guideline: "Richtlinie",
    docs: "Dokumentation",
    reportTitle: "Guidelint — App Store / Google Play Einreichungsbericht",
    projectInfo: "Projektinfo",
    path: "Pfad",
    scanDate: "Scandatum",
    findings: "Ergebnisse",
    findingsDescription:
      "Nachfolgend die gefundenen Probleme. Jedes enthält Regel-ID, Schweregrad, Problembeschreibung und Lösung.",
    aiFix: "KI-Behebungsanweisungen",
    aiFixStep1:
      "Schritt 1: Kritische Probleme beheben (vor Einreichung erforderlich)",
    aiFixStep2:
      "Schritt 2: Schwerwiegende Probleme beheben (dringend empfohlen)",
    aiFixStep3:
      "Schritt 3: Mittlere/niedrige Probleme prüfen (empfehlenswert)",
    readyForSubmission: "Bereit zur Einreichung",
    riskyReview: "Riskant — Probleme vor der Einreichung prüfen",
    notReadyCritical:
      "Nicht bereit — kritische Probleme müssen behoben werden",
    noIssuesFound:
      "Keine Probleme gefunden. Das Projekt scheint einreichungsbereit zu sein.",
  },
  rules: {
    "IOS-PLIST-001": {
      title: "Info.plist nicht gefunden",
      message: "Info.plist-Datei konnte nicht gefunden werden",
      fix: "Erstelle Info.plist über Xcode > Target > Info-Tab",
    },
    "IOS-PRIV-100": {
      title: "PrivacyInfo.xcprivacy nicht gefunden",
      message:
        "PrivacyInfo.xcprivacy-Datei fehlt. Seit Mai 2024 erforderlich.",
      fix: "Erstelle über Xcode > New File > iOS > Resource > App Privacy",
    },
    "IOS-PRIV-101": {
      title: "PrivacyInfo.xcprivacy: Pflichtschlüssel fehlen",
      message: "PrivacyInfo.xcprivacy fehlen Pflichtschlüssel: {keys}",
      fix: "Füge alle Pflichtschlüssel zur PrivacyInfo.xcprivacy hinzu",
    },
    "IOS-PRIV-001": {
      title: "NSCameraUsageDescription fehlt",
      message:
        "Kameranutzung erkannt, aber NSCameraUsageDescription fehlt in Info.plist",
      fix: "Füge <key>NSCameraUsageDescription</key><string>Beschreibe warum du die Kamera brauchst</string> zur Info.plist hinzu",
    },
    "IOS-PRIV-002": {
      title: "NSMicrophoneUsageDescription fehlt",
      message:
        "Mikrofonnutzung erkannt, aber NSMicrophoneUsageDescription fehlt in Info.plist",
      fix: "Füge NSMicrophoneUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-003": {
      title: "NSLocationWhenInUseUsageDescription fehlt",
      message:
        "Standortnutzung erkannt, aber NSLocationWhenInUseUsageDescription fehlt in Info.plist",
      fix: "Füge NSLocationWhenInUseUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-004": {
      title: "NSPhotoLibraryUsageDescription fehlt",
      message:
        "Fotobibliothek-Zugriff erkannt, aber NSPhotoLibraryUsageDescription fehlt in Info.plist",
      fix: "Füge NSPhotoLibraryUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-005": {
      title: "NSContactsUsageDescription fehlt",
      message:
        "Kontaktzugriff erkannt, aber NSContactsUsageDescription fehlt in Info.plist",
      fix: "Füge NSContactsUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-006": {
      title: "NSBluetoothAlwaysUsageDescription fehlt",
      message:
        "Bluetooth-Nutzung erkannt, aber NSBluetoothAlwaysUsageDescription fehlt in Info.plist",
      fix: "Füge NSBluetoothAlwaysUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-007": {
      title: "NSFaceIDUsageDescription fehlt",
      message:
        "Biometrische Auth erkannt, aber NSFaceIDUsageDescription fehlt in Info.plist",
      fix: "Füge NSFaceIDUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-008": {
      title: "NSCalendarsUsageDescription fehlt",
      message:
        "Kalenderzugriff erkannt, aber NSCalendarsUsageDescription fehlt in Info.plist",
      fix: "Füge NSCalendarsUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-009": {
      title: "NSMotionUsageDescription fehlt",
      message:
        "Bewegungssensor-Zugriff erkannt, aber NSMotionUsageDescription fehlt in Info.plist",
      fix: "Füge NSMotionUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-010": {
      title: "NSSpeechRecognitionUsageDescription fehlt",
      message:
        "Spracherkennung erkannt, aber NSSpeechRecognitionUsageDescription fehlt in Info.plist",
      fix: "Füge NSSpeechRecognitionUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-200": {
      title: "AppTrackingTransparency-Framework fehlt",
      message:
        "IDFA/Tracking-Nutzung erkannt, aber AppTrackingTransparency-Framework fehlt",
      fix: "Importiere AppTrackingTransparency und rufe ATTrackingManager.requestTrackingAuthorization auf",
    },
    "IOS-PRIV-201": {
      title: "NSUserTrackingUsageDescription fehlt",
      message:
        "ATT-Framework wird verwendet, aber NSUserTrackingUsageDescription fehlt in Info.plist",
      fix: "Füge NSUserTrackingUsageDescription zur Info.plist hinzu",
    },
    "IOS-PRIV-300": {
      title: "Kontolöschung nicht gefunden",
      message:
        "Benutzeranmeldung erkannt, aber keine Kontolöschungsfunktion gefunden",
      fix: "Füge einen In-App-Kontolöschungsablauf hinzu (nur E-Mail reicht nicht aus)",
    },
    "IOS-PRIV-400": {
      title: "Nutzungsbeschreibung von niedriger Qualität",
      message: 'Nutzungsbeschreibung zu kurz oder generisch: "{value}"',
      fix: "Schreibe eine spezifische, aussagekräftige Beschreibung",
    },
    "IOS-SEC-001": {
      title: "App Transport Security vollständig deaktiviert",
      message:
        "NSAllowsArbitraryLoads=true — gesamter HTTP-Verkehr erlaubt",
      fix: "Entferne NSAllowsArbitraryLoads, verwende NSExceptionDomains für bestimmte Domains",
    },
    "IOS-META-001": {
      title: "Bundle-ID enthält Test-/Beispiel-Domain",
      message: 'Bundle-ID "{bundleId}" enthält eine Test-/Beispiel-Domain',
      fix: "Ersetze durch deine echte Domain (com.firma.appname)",
    },
    "IOS-IAP-001": {
      title: "StoreKit vorhanden, Käufe wiederherstellen fehlt",
      message:
        "StoreKit importiert, aber keine Implementierung zum Wiederherstellen von Käufen gefunden",
      fix: "Füge einen Button 'Käufe wiederherstellen' und die entsprechende Logik hinzu",
    },
    "IOS-CRASH-001": {
      title: "Force Unwrap (!) Verwendung",
      message: "{count} Force-Unwrap (!) Instanzen erkannt — Absturzrisiko",
      fix: "Verwende guard let / if let oder Nil-Coalescing (??) stattdessen",
    },
    "IOS-CRASH-002": {
      title: "fatalError() im Produktionscode",
      message: "fatalError()-Aufruf verursacht Absturz in Produktion",
      fix: "Ersetze fatalError() durch ordnungsgemäße Fehlerbehandlung",
    },
    "AND-MANIF-001": {
      title: "AndroidManifest.xml nicht gefunden",
      message: "AndroidManifest.xml-Datei konnte nicht gefunden werden",
      fix: "Erstelle app/src/main/AndroidManifest.xml",
    },
    "AND-MANIF-100": {
      title: "Gefährliche Berechtigung: READ_SMS",
      message: "READ_SMS — erfordert spezielle Deklaration in der Play Console",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist. Falls ja, fülle das Deklarationsformular in der Play Console aus",
    },
    "AND-MANIF-101": {
      title: "Gefährliche Berechtigung: READ_CALL_LOG",
      message: "READ_CALL_LOG — erfordert spezielle Deklaration in der Play Console",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist",
    },
    "AND-MANIF-102": {
      title: "Gefährliche Berechtigung: PROCESS_OUTGOING_CALLS",
      message: "PROCESS_OUTGOING_CALLS — veraltet und verboten",
      fix: "Entferne diese Berechtigung vollständig",
    },
    "AND-MANIF-103": {
      title: "Gefährliche Berechtigung: BIND_ACCESSIBILITY_SERVICE",
      message: "BIND_ACCESSIBILITY_SERVICE — sehr strenge Überprüfung",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist",
    },
    "AND-MANIF-104": {
      title: "Gefährliche Berechtigung: ACCESS_BACKGROUND_LOCATION",
      message: "ACCESS_BACKGROUND_LOCATION — erfordert zusätzliche Genehmigung",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist",
    },
    "AND-MANIF-105": {
      title: "Gefährliche Berechtigung: MANAGE_EXTERNAL_STORAGE",
      message: "MANAGE_EXTERNAL_STORAGE — strenge Überprüfung",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist",
    },
    "AND-MANIF-106": {
      title: "Gefährliche Berechtigung: REQUEST_INSTALL_PACKAGES",
      message: "REQUEST_INSTALL_PACKAGES — erfordert Sicherheitsüberprüfung",
      fix: "Prüfe, ob diese Berechtigung wirklich nötig ist",
    },
    "AND-MANIF-200": {
      title: "android:exported nicht angegeben",
      message: "Komponente ohne android:exported — erforderlich für Android 12+",
      fix: 'Füge android:exported="true" oder "false" zu allen Activities, Services und Receivers hinzu',
    },
    "AND-SEC-001": {
      title: "Klartext-HTTP-Verkehr aktiviert",
      message: "usesCleartextTraffic=true — HTTP-Verkehr erlaubt",
      fix: "Entferne usesCleartextTraffic oder verwalte pro Domain via network_security_config.xml",
    },
    "AND-SEC-100": {
      title: "Verbotene Geräte-ID-Nutzung",
      message: "IMEI/DeviceId/MAC-Zugriff — bei Google Play verboten",
      fix: "Verwende AdvertisingIdClient oder Firebase Instance ID stattdessen",
    },
    "AND-GRADLE-001": {
      title: "targetSdkVersion zu niedrig",
      message: "targetSdkVersion {version} — Google Play erfordert 35 für neue Apps",
      fix: "Erhöhe targetSdkVersion auf 35",
    },
    "AND-GRADLE-002": {
      title: "compileSdk zu niedrig",
      message: "compileSdk {version} — sollte mindestens 34 sein",
      fix: "Erhöhe compileSdk auf 35",
    },
    "AND-GRADLE-003": {
      title: "Release-Build ist debuggable",
      message: "debuggable=true im Release-Build — Sicherheitsrisiko",
      fix: "Setze debuggable=false im Release-Build-Typ",
    },
    "AND-GRADLE-004": {
      title: "Release-Minifizierung deaktiviert",
      message: "minifyEnabled=false im Release-Build — Code ungeschützt",
      fix: "Setze minifyEnabled=true und konfiguriere ProGuard-Regeln",
    },
    "AND-CRASH-001": {
      title: "PendingIntent-Flag fehlt",
      message: "PendingIntent ohne FLAG_IMMUTABLE/FLAG_MUTABLE — Absturz auf Android 12+",
      fix: "Füge PendingIntent.FLAG_IMMUTABLE oder FLAG_MUTABLE hinzu",
    },
    "AND-PRIV-001": {
      title: "Datenschutzerklärung nicht gefunden",
      message: "Keine Datenschutzerklärung-URL gefunden — bei Google Play erforderlich",
      fix: "Füge eine Datenschutzerklärung-URL in die App und das Play Console-Listing ein",
    },
    "AND-PRIV-002": {
      title: "Kontolöschung nicht gefunden",
      message: "Benutzeranmeldung erkannt, aber keine Kontolöschungsfunktion gefunden",
      fix: "Füge einen In-App-Kontolöschungsablauf hinzu — bei Google Play erforderlich",
    },
    "COM-SEC-001": {
      title: "Hartcodierter API-Schlüssel/Geheimnis erkannt",
      message: "Hartcodierter API-Schlüssel oder Geheimnis im Quellcode gefunden",
      fix: "Verwende Umgebungsvariablen, .env-Dateien oder plattformspezifische Geheimnismanager",
    },
    "COM-SEC-002": {
      title: "HTTP-URL-Verwendung",
      message: "HTTP-URL erkannt — verwende HTTPS stattdessen",
      fix: "Ändere alle URLs auf HTTPS",
    },
    "COM-SEC-003": {
      title: "Risiko der Protokollierung sensibler Daten",
      message: "Sensible Daten (Passwort, Token, etc.) in Log/Print-Anweisung gefunden",
      fix: "Protokolliere niemals sensible Daten",
    },
    "COM-META-001": {
      title: "Lorem-ipsum-Platzhalterinhalt",
      message: "Lorem-ipsum-Platzhalterinhalt erkannt — wird bei Store-Review abgelehnt",
      fix: "Ersetze durch echten Inhalt",
    },
    "COM-META-002": {
      title: "Platzhalter-Bilddateiname",
      message: "Platzhalter-/Testbilddatei erkannt",
      fix: "Ersetze durch Produktions-Assets",
    },
    "COM-META-003": {
      title: "TODO/FIXME-Kommentare",
      message: "{count} TODO/FIXME-Kommentare erkannt — möglicherweise ungelöste Probleme",
      fix: "Überprüfe alle TODO/FIXME-Kommentare vor der Einreichung",
    },
    "COM-META-004": {
      title: "Debug-Print-Anweisungen",
      message: "{count} Debug-Print-/Log-Anweisungen — sollten in Release-Builds entfernt werden",
      fix: "Entferne oder kompiliere Print-/Log-Anweisungen bedingt für Release-Builds",
    },
    "COM-CRASH-001": {
      title: "Leerer Catch-Block",
      message: "{count} leere(r) Catch-Block(s) — Fehler werden möglicherweise stillschweigend geschluckt",
      fix: "Protokolliere Fehler oder informiere den Benutzer, anstatt sie stillschweigend zu schlucken",
    },
  },
};
