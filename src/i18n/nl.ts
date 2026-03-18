import type { Translations } from "./index.js";

export const nl: Translations = {
  ui: {
    scanTitle: "guidelint",
    platform: "Platform",
    filesScanned: "bestanden gescand",
    rulesChecked: "regels gecontroleerd",
    noIssues: "Geen problemen gevonden — ziet er goed uit!",
    score: "SCORE",
    verdictReady: "GEREED — Kan worden ingediend",
    verdictRisky: "RISICOVOL — Bekijk problemen voor indiening",
    verdictNotReady: "NIET GEREED — Kritieke problemen moeten worden opgelost",
    fix: "Oplossing",
    file: "Bestand",
    severity: "Ernst",
    category: "Categorie",
    problem: "Probleem",
    guideline: "Richtlijn",
    docs: "Documentatie",
    reportTitle: "Guidelint — App Store / Google Play Pre-indiening Rapport",
    projectInfo: "Projectinfo",
    path: "Pad",
    scanDate: "Scandatum",
    findings: "Bevindingen",
    findingsDescription:
      "Hieronder de gevonden problemen. Elk bevat regel-ID, ernst, probleembeschrijving en oplossing.",
    aiFix: "AI-oplossingsinstructies",
    aiFixStep1:
      "Stap 1: Los kritieke problemen op (vereist voor indiening)",
    aiFixStep2:
      "Stap 2: Los ernstige problemen op (sterk aanbevolen)",
    aiFixStep3:
      "Stap 3: Bekijk gemiddelde/lage problemen (aanbevolen)",
    readyForSubmission: "Gereed voor indiening",
    riskyReview: "Risicovol — bekijk problemen voor indiening",
    notReadyCritical:
      "Niet gereed — kritieke problemen moeten worden opgelost",
    noIssuesFound:
      "Geen problemen gevonden. Het project lijkt klaar voor indiening.",
  },
  rules: {
    "IOS-PLIST-001": {
      title: "Info.plist niet gevonden",
      message: "Info.plist-bestand kon niet worden gevonden",
      fix: "Maak Info.plist aan via Xcode > Target > Info-tab",
    },
    "IOS-PRIV-100": {
      title: "PrivacyInfo.xcprivacy niet gevonden",
      message: "PrivacyInfo.xcprivacy-bestand ontbreekt. Vereist sinds mei 2024.",
      fix: "Maak aan via Xcode > New File > iOS > Resource > App Privacy",
    },
    "IOS-PRIV-101": {
      title: "PrivacyInfo.xcprivacy: verplichte sleutels ontbreken",
      message: "PrivacyInfo.xcprivacy mist verplichte sleutels: {keys}",
      fix: "Voeg alle verplichte sleutels toe aan PrivacyInfo.xcprivacy",
    },
    "IOS-PRIV-001": {
      title: "NSCameraUsageDescription ontbreekt",
      message: "Cameragebruik gedetecteerd maar NSCameraUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSCameraUsageDescription toe aan Info.plist met een beschrijving waarom je de camera nodig hebt",
    },
    "IOS-PRIV-002": {
      title: "NSMicrophoneUsageDescription ontbreekt",
      message: "Microfoongebruik gedetecteerd maar NSMicrophoneUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSMicrophoneUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-003": {
      title: "NSLocationWhenInUseUsageDescription ontbreekt",
      message: "Locatiegebruik gedetecteerd maar NSLocationWhenInUseUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSLocationWhenInUseUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-004": {
      title: "NSPhotoLibraryUsageDescription ontbreekt",
      message: "Fotobibliotheektoegang gedetecteerd maar NSPhotoLibraryUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSPhotoLibraryUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-005": {
      title: "NSContactsUsageDescription ontbreekt",
      message: "Contactentoegang gedetecteerd maar NSContactsUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSContactsUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-006": {
      title: "NSBluetoothAlwaysUsageDescription ontbreekt",
      message: "Bluetooth-gebruik gedetecteerd maar NSBluetoothAlwaysUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSBluetoothAlwaysUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-007": {
      title: "NSFaceIDUsageDescription ontbreekt",
      message: "Biometrische auth gedetecteerd maar NSFaceIDUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSFaceIDUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-008": {
      title: "NSCalendarsUsageDescription ontbreekt",
      message: "Kalendertoegang gedetecteerd maar NSCalendarsUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSCalendarsUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-009": {
      title: "NSMotionUsageDescription ontbreekt",
      message: "Bewegingssensortoegang gedetecteerd maar NSMotionUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSMotionUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-010": {
      title: "NSSpeechRecognitionUsageDescription ontbreekt",
      message: "Spraakherkenning gedetecteerd maar NSSpeechRecognitionUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSSpeechRecognitionUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-200": {
      title: "AppTrackingTransparency-framework ontbreekt",
      message: "IDFA/tracking-gebruik gedetecteerd maar AppTrackingTransparency-framework ontbreekt",
      fix: "Importeer AppTrackingTransparency en roep ATTrackingManager.requestTrackingAuthorization aan",
    },
    "IOS-PRIV-201": {
      title: "NSUserTrackingUsageDescription ontbreekt",
      message: "ATT-framework wordt gebruikt maar NSUserTrackingUsageDescription ontbreekt in Info.plist",
      fix: "Voeg NSUserTrackingUsageDescription toe aan Info.plist",
    },
    "IOS-PRIV-300": {
      title: "Accountverwijdering niet gevonden",
      message: "Gebruikersauthenticatie gedetecteerd maar geen accountverwijderingsfunctie gevonden",
      fix: "Voeg een in-app accountverwijderingsproces toe (alleen e-mail is niet voldoende)",
    },
    "IOS-PRIV-400": {
      title: "Lage kwaliteit gebruiksbeschrijving",
      message: 'Gebruiksbeschrijving te kort of generiek: "{value}"',
      fix: "Schrijf een specifieke, betekenisvolle beschrijving",
    },
    "IOS-SEC-001": {
      title: "App Transport Security volledig uitgeschakeld",
      message: "NSAllowsArbitraryLoads=true — al het HTTP-verkeer toegestaan",
      fix: "Verwijder NSAllowsArbitraryLoads, gebruik NSExceptionDomains voor specifieke domeinen",
    },
    "IOS-META-001": {
      title: "Bundle-ID bevat test-/voorbeelddomein",
      message: 'Bundle-ID "{bundleId}" bevat een test-/voorbeelddomein',
      fix: "Vervang door je echte domein (com.bedrijf.appnaam)",
    },
    "IOS-IAP-001": {
      title: "StoreKit aanwezig, Aankopen herstellen ontbreekt",
      message: "StoreKit geïmporteerd maar geen implementatie voor het herstellen van aankopen gevonden",
      fix: "Voeg een knop 'Aankopen herstellen' en de bijbehorende logica toe",
    },
    "IOS-CRASH-001": {
      title: "Force unwrap (!) gebruik",
      message: "{count} force unwrap (!) instanties gedetecteerd — crashrisico",
      fix: "Gebruik guard let / if let of nil coalescing (??) in plaats daarvan",
    },
    "IOS-CRASH-002": {
      title: "fatalError() in productiecode",
      message: "fatalError()-aanroep veroorzaakt crash in productie",
      fix: "Vervang fatalError() door correcte foutafhandeling",
    },
    "AND-MANIF-001": {
      title: "AndroidManifest.xml niet gevonden",
      message: "AndroidManifest.xml-bestand kon niet worden gevonden",
      fix: "Maak app/src/main/AndroidManifest.xml aan",
    },
    "AND-MANIF-100": {
      title: "Gevaarlijke toestemming: READ_SMS",
      message: "READ_SMS — vereist speciale verklaring in Play Console",
      fix: "Controleer of deze toestemming echt nodig is. Zo ja, vul het verklaringsformulier in Play Console in",
    },
    "AND-MANIF-101": {
      title: "Gevaarlijke toestemming: READ_CALL_LOG",
      message: "READ_CALL_LOG — vereist speciale verklaring in Play Console",
      fix: "Controleer of deze toestemming echt nodig is",
    },
    "AND-MANIF-102": {
      title: "Gevaarlijke toestemming: PROCESS_OUTGOING_CALLS",
      message: "PROCESS_OUTGOING_CALLS — verouderd en verboden",
      fix: "Verwijder deze toestemming volledig",
    },
    "AND-MANIF-103": {
      title: "Gevaarlijke toestemming: BIND_ACCESSIBILITY_SERVICE",
      message: "BIND_ACCESSIBILITY_SERVICE — zeer strenge controle",
      fix: "Controleer of deze toestemming echt nodig is",
    },
    "AND-MANIF-104": {
      title: "Gevaarlijke toestemming: ACCESS_BACKGROUND_LOCATION",
      message: "ACCESS_BACKGROUND_LOCATION — vereist aanvullende goedkeuring",
      fix: "Controleer of deze toestemming echt nodig is",
    },
    "AND-MANIF-105": {
      title: "Gevaarlijke toestemming: MANAGE_EXTERNAL_STORAGE",
      message: "MANAGE_EXTERNAL_STORAGE — strenge controle",
      fix: "Controleer of deze toestemming echt nodig is",
    },
    "AND-MANIF-106": {
      title: "Gevaarlijke toestemming: REQUEST_INSTALL_PACKAGES",
      message: "REQUEST_INSTALL_PACKAGES — vereist beveiligingscontrole",
      fix: "Controleer of deze toestemming echt nodig is",
    },
    "AND-MANIF-200": {
      title: "android:exported niet opgegeven",
      message: "Component zonder android:exported — vereist voor Android 12+",
      fix: 'Voeg android:exported="true" of "false" toe aan alle activities, services en receivers',
    },
    "AND-SEC-001": {
      title: "Cleartext HTTP-verkeer ingeschakeld",
      message: "usesCleartextTraffic=true — HTTP-verkeer toegestaan",
      fix: "Verwijder usesCleartextTraffic of beheer per domein via network_security_config.xml",
    },
    "AND-SEC-100": {
      title: "Verboden apparaat-ID-gebruik",
      message: "IMEI/DeviceId/MAC-toegang — verboden op Google Play",
      fix: "Gebruik AdvertisingIdClient of Firebase Instance ID in plaats daarvan",
    },
    "AND-GRADLE-001": {
      title: "targetSdkVersion te laag",
      message: "targetSdkVersion {version} — Google Play vereist 35 voor nieuwe apps",
      fix: "Verhoog targetSdkVersion naar 35",
    },
    "AND-GRADLE-002": {
      title: "compileSdk te laag",
      message: "compileSdk {version} — moet minimaal 34 zijn",
      fix: "Verhoog compileSdk naar 35",
    },
    "AND-GRADLE-003": {
      title: "Release-build is debuggable",
      message: "debuggable=true in release-build — beveiligingsrisico",
      fix: "Zet debuggable=false in het release-buildtype",
    },
    "AND-GRADLE-004": {
      title: "Release-minificatie uitgeschakeld",
      message: "minifyEnabled=false in release-build — code onbeschermd",
      fix: "Zet minifyEnabled=true en configureer ProGuard-regels",
    },
    "AND-CRASH-001": {
      title: "PendingIntent-vlag ontbreekt",
      message: "PendingIntent zonder FLAG_IMMUTABLE/FLAG_MUTABLE — crash op Android 12+",
      fix: "Voeg PendingIntent.FLAG_IMMUTABLE of FLAG_MUTABLE toe",
    },
    "AND-PRIV-001": {
      title: "Privacybeleid-referentie niet gevonden",
      message: "Geen privacybeleid-URL gevonden — vereist op Google Play",
      fix: "Voeg een privacybeleid-URL toe aan de app en de Play Console-vermelding",
    },
    "AND-PRIV-002": {
      title: "Accountverwijdering niet gevonden",
      message: "Gebruikersauthenticatie gedetecteerd maar geen accountverwijderingsfunctie gevonden",
      fix: "Voeg een in-app accountverwijderingsproces toe — vereist op Google Play",
    },
    "COM-SEC-001": {
      title: "Hardgecodeerde API-sleutel/geheim gedetecteerd",
      message: "Hardgecodeerde API-sleutel of geheim gevonden in broncode",
      fix: "Gebruik omgevingsvariabelen, .env-bestanden of platformspecifieke geheimenbeheerders",
    },
    "COM-SEC-002": {
      title: "HTTP-URL-gebruik",
      message: "HTTP-URL gedetecteerd — gebruik HTTPS in plaats daarvan",
      fix: "Wijzig alle URL's naar HTTPS",
    },
    "COM-SEC-003": {
      title: "Risico op loggen van gevoelige gegevens",
      message: "Gevoelige gegevens (wachtwoord, token, etc.) gevonden in log/print-statement",
      fix: "Log nooit gevoelige gegevens",
    },
    "COM-META-001": {
      title: "Lorem ipsum plaatshouderinhoud",
      message: "Lorem ipsum plaatshouderinhoud gedetecteerd — wordt afgewezen bij store-review",
      fix: "Vervang door echte inhoud",
    },
    "COM-META-002": {
      title: "Plaatshouder-afbeeldingsbestandsnaam",
      message: "Plaatshouder-/testafbeeldingsbestand gedetecteerd",
      fix: "Vervang door productie-assets",
    },
    "COM-META-003": {
      title: "TODO/FIXME-opmerkingen",
      message: "{count} TODO/FIXME-opmerkingen gedetecteerd — mogelijk onopgeloste problemen",
      fix: "Bekijk alle TODO/FIXME-opmerkingen voor indiening",
    },
    "COM-META-004": {
      title: "Debug print-statements",
      message: "{count} debug print-/log-statements — moeten worden verwijderd in release-builds",
      fix: "Verwijder of compileer print-/log-statements voorwaardelijk voor release-builds",
    },
    "COM-CRASH-001": {
      title: "Leeg catch-blok",
      message: "{count} leeg/lege catch-blok(ken) — fouten worden mogelijk stilzwijgend genegeerd",
      fix: "Log fouten of informeer de gebruiker in plaats van ze stilzwijgend te negeren",
    },
  },
};
