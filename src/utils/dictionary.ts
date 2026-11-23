import { ALL_FLASHCARDS } from '../data/vocabAll';
import { NOUN_TO_ADJECTIVE_TABLE, UNIT4_WORD_BUILDING } from '../data/unit4';
import { ALL_WORD_FAMILIES } from '../data/wordFormation';

export interface DictionaryHit {
  matchedText: string;
  en: string;
  pl: string;
  note?: string;
}

// Comprehensive B1/B2 English -> Polish dictionary covering exercises, texts, grammar & worksheets
const CORE_DICTIONARY: Record<string, string> = {
  // Multi-word collocations & grammar structures
  'takeover bid': 'oferta przejęcia firmy',
  'product lines': 'linie produktowe',
  'product line': 'linia produktowa',
  'emerging markets': 'rynki wschodzące',
  'emerging market': 'rynek wschodzący',
  'major player': 'główny gracz na rynku',
  'major players': 'główni gracze na rynku',
  'profit margin': 'marża zysku',
  'profit margins': 'marże zysku',
  'market share': 'udział w rynku',
  'home market': 'rynek krajowy',
  'retail market': 'rynek detaliczny',
  'grocery market': 'rynek spożywczy',
  'discount chain': 'sieć dyskontów',
  'discount chains': 'sieci dyskontów',
  'staffed checkouts': 'kasy z obsługą',
  'self-service checkout': 'kasa samoobsługowa',
  'loyalty card': 'karta lojalnościowa',
  'discount vouchers': 'kupony rabatowe',
  'luxury goods': 'dobra luksusowe',
  'high-end products': 'produkty z wyższej półki',
  'own-brand products': 'produkty marki własnej',
  'locally sourced': 'pozyskiwany lokalnie',
  'non-core businesses': 'działalność poboczna (niekluczowa)',
  'core business': 'główna działalność firmy',
  'processed food': 'żywność przetworzona',
  'dairy products': 'produkty nabiałowe',
  'consumer habits': 'nawyki konsumenckie',
  'product range': 'asortyment produktów',
  'pie chart': 'wykres kołowy',
  'bar chart': 'wykres słupkowy',
  'corporate tax': 'podatek dochodowy od firm (CIT)',
  'corporate taxes': 'podatki od przedsiębiorstw',
  'employment laws': 'prawo pracy',
  'exchange rates': 'kursy walut',
  'interest rates': 'stopy procentowe',
  'age demographics': 'demografia wiekowa',
  'economic recession': 'recesja gospodarcza',
  'economic crisis': 'kryzys ekonomiczny',
  'inevitable crisis': 'nieunikniony kryzys',
  'relevant factor': 'istotny / adekwatny czynnik',
  'relevant factors': 'istotne czynniki',
  'external factor': 'czynnik zewnętrzny',
  'considerable risk': 'znaczne ryzyko',
  'bold strategy': 'odważna strategia',
  'press release': 'komunikat prasowy',
  'senior management': 'wyższa kadra kierownicza',
  'senior managers': 'menedżerowie wyższego szczebla',
  'line manager': 'bezpośredni przełożony',
  'academic staff': 'kadra akademicka',
  'overseas students': 'studenci zagraniczni',
  'potential customers': 'potencjalni klienci',
  'negative feedback': 'negatywna opinia / feedback',
  'project delay': 'opóźnienie projektu',
  'return flight': 'lot powrotny',
  'return flights': 'loty powrotne',
  'hard hats': 'kaski ochronne (robocze)',
  'out-of-town stores': 'sklepy na obrzeżach miast',
  'social media': 'media społecznościowe',
  'market research': 'badania rynku',
  'customer service': 'obsługa klienta',
  'customer support': 'wsparcie klienta',
  'quality control': 'kontrola jakości',
  'traffic congestion': 'korki drogowe / zatłoczenie ruchu',
  'collection lockers': 'paczkomaty / skrytki odbiorcze',
  'steering wheel': 'kierownica',
  'fulfilment centre': 'centrum realizacji zamówień',
  'in transit': 'w transporcie (w drodze)',
  'withhold payment': 'wstrzymać płatność',
  'prompt response': 'niezwłoczna odpowiedź',
  'mutual satisfaction': 'obopólne zadowolenie',
  'petty cash': 'kasa podręczna (drobna gotówka)',
  'flying colours': 'śpiewająco (zdać z bardzo dobrym wynikiem)',
  'walks of life': 'różne środowiska / grupy społeczne',
  'hands-on experience': 'praktyczne doświadczenie',
  'work placement': 'praktyka zawodowa / staż',
  'gap year': 'rok przerwy przed lub w trakcie studiów',
  'career ladder': 'ścieżka / drabina kariery',
  'staff turnover': 'rotacja pracowników',
  'remuneration committee': 'komitet ds. wynagrodzeń',
  'saturated marketplace': 'nasycony rynek',
  'inferior service': 'gorsza jakość obsługi',
  'beyond repair': 'nie do naprawienia',
  'odd hours': 'nietypowe / nieregularne godziny pracy',
  'flight attendant': 'steward / stewardesa',
  'fine print': 'drobny druk (w umowie)',

  // Phrasal verbs & idioms
  'take over': 'przejąć (firmę)',
  'took over': 'przejął / przejęliśmy (firmę)',
  'taken over': 'przejęty (o firmie)',
  'take on': 'podjąć się (zadania) / zatrudnić',
  'step in': 'wkroczyć / zainterweniować',
  'stepped in': 'wkroczył / zainterweniował',
  'go over': 'przejrzeć / dokładnie omówić / przekroczyć',
  'carry out': 'przeprowadzić (np. ankietę, badania)',
  'carried out': 'przeprowadził / przeprowadzono',
  'come up with': 'wymyślić (plan / rozwiązanie)',
  'came up with': 'wymyślił (plan / rozwiązanie)',
  'get back on track': 'wrócić na właściwe tory',
  'back on track': 'z powrotem na właściwych torach',
  'run behind schedule': 'mieć opóźnienie w harmonogramie',
  'behind schedule': 'z opóźnieniem względem planu',
  'make up the time': 'nadrobić stracony czas',
  'take a gamble': 'zaryzykować / postawić na jedną kartę',
  'took a gamble': 'zaryzykował',
  'pay off': 'opłacić się / przynieść efekty',
  'paid off': 'opłaciło się',
  'sell off': 'wyprzedać (np. część firmy)',
  'sold off': 'wyprzedał / wyprzedali',
  'cut costs': 'ciąć koszty',
  'take risks': 'podejmować ryzyko',
  'miss opportunities': 'przegapiać szanse / okazje',
  'missed opportunities': 'przegapione szanse',
  'tackle the problem': 'zmierzyć się z problemem / rozwiązać problem',
  'make redundant': 'zwolnić (w ramach redukcji etatów)',
  'made redundant': 'zwolniony (redukcja etatu)',
  'lay off': 'zwolnić pracowników (redukcja)',
  'laid off': 'zwolnił pracowników',
  'put forward': 'przedstawić / wysunąć (propozycję)',
  'postpone': 'odłożyć na później / przełożyć',
  'put off': 'odłożyć w czasie / zniechęcić',
  'look after': 'opiekować się / dbać o',
  'in charge of': 'odpowiedzialny za / kierujący czymś',
  'take care of': 'zająć się czymś / zadbać o',
  'report to': 'podlegać komuś służbowo',
  'stand out': 'wyróżniać się',
  'come across': 'robić wrażenie / natknąć się',
  'go on strike': 'rozpocząć strajk',
  'bump into': 'wpaść na kogoś przypadkiem',
  'get held up': 'utknąć / opóźnić się',
  'held up': 'zatrzymany / opóźniony',
  'pick up on': 'nawiązać do (tego, co ktoś powiedział)',
  'build on': 'rozwinąć (czyjś pomysł)',
  'help out': 'poratować / pomóc komuś',
  'give a hand': 'pomóc komuś (podać pomocną dłoń)',
  'need a hand': 'potrzebować pomocy',

  // Connectors & Grammar phrases
  'due to': 'z powodu (+ rzeczownik / -ing)',
  'because of': 'z powodu (+ rzeczownik / -ing)',
  'as a result of': 'wskutek / w wyniku (+ rzeczownik)',
  'as a result': 'w rezultacie / w konsekwencji',
  'result in': 'skutkować czymś / prowadzić do',
  'resulted in': 'poskutkowało / doprowadziło do',
  'resulting in': 'skutkując / prowadząc do',
  'lead to': 'prowadzić do',
  'led to': 'doprowadziło do',
  'in order to': 'aby / w celu (+ bezokolicznik)',
  'as soon as': 'jak tylko (po tym NIE stawiamy will!)',
  'as soon as possible': 'tak szybko, jak to możliwe (ASAP)',
  'by the time': 'do czasu gdy / zanim',
  'as long as': 'pod warunkiem, że / dopóki',
  'provided that': 'pod warunkiem, że',
  'in case': 'na wypadek gdyby',
  'even if': 'nawet jeśli',
  'even though': 'mimo że (+ pełne zdanie)',
  'in spite of': 'pomimo (+ rzeczownik / -ing)',
  'would rather': 'wolałby / wolałbym',
  'would prefer': 'wolałby / preferowałby (+ to V)',
  'rather than': 'zamiast / niż',
  'high time': 'najwyższy czas (+ Past Simple!)',
  'should have': 'powinien był (w przeszłości! + V3)',
  "shouldn't have": 'nie powinien był (w przeszłości! + V3)',
  'not to mention': 'nie wspominając o (bez "about"!)',
  'all things considered': 'biorąc wszystko pod uwagę',
  'to begin with': 'na początek / po pierwsze',
  'in addition': 'ponadto / w dodatku',

  // Noun -> Adjective & Travel/Holiday list words
  mountainous: 'górzysty (od: mountain)',
  luxurious: 'luksusowy (od: luxury)',
  spacious: 'przestronny (od: space)',
  cloudless: 'bezchmurny (od: cloud)',
  overpriced: 'zbyt drogi / przepłacony (od: price)',
  uncomfortable: 'niewygodny (od: comfort)',
  comfortable: 'wygodny',
  peaceful: 'spokojny (od: peace)',
  seafront: 'nadbrzeże / promenada nadmorska',
  facilities: 'udogodnienia / obiekty / zaplecze',
  surroundings: 'otoczenie / okolica',
  welcoming: 'przyjazny / gościnny',
  cuisine: 'kuchnia (styl gotowania)',
  elegant: 'elegancki / wykwintny (od: elegance)',
  elegance: 'elegancja',
  delicious: 'pyszny / wyśmienity',
  tasty: 'smaczny (od: taste)',
  endless: 'niekończący się (od: end)',
  bottomless: 'bezdenny (od: bottom)',
  towering: 'górujący / ogromny (od: tower)',
  vast: 'rozległy / ogromny',
  unpolluted: 'niezanieczyszczony (od: pollute)',
  polluted: 'zanieczyszczony',
  pollution: 'zanieczyszczenie',
  enjoyable: 'przyjemny / udany (od: enjoy)',
  spicy: 'pikantny / ostry (od: spice)',
  spice: 'przyprawa',
  lively: 'tętniący życiem / żywy (przymiotnik od: life!)',
  colourful: 'barwny / kolorowy (od: colour)',
  colorful: 'barwny / kolorowy',
  nightlife: 'życie nocne',
  traditional: 'tradycyjny (od: tradition)',
  impressive: 'imponujący (od: impress)',
  temples: 'świątynie',
  temple: 'świątynia',
  sandy: 'piaszczysty (od: sand)',
  sand: 'piasek',
  campsite: 'pole namiotowe / kemping',
  campsites: 'pola namiotowe',
  'well-equipped': 'dobrze wyposażony',
  equipped: 'wyposażony',
  equipment: 'wyposażenie / sprzęt',
  valley: 'dolina',
  trekking: 'wędrówka górska / trekking',
  resort: 'kurort / ośrodek wypoczynkowy',
  guesthouse: 'pensjonat',
  sights: 'zabytki / ciekawe miejsca do zwiedzania',
  parachuting: 'skoki ze spadochronem',

  // Worksheet 5/15, 2/15, 3/15 words
  tolerance: 'tolerancja (rzeczownik)',
  tolerant: 'tolerancyjny (przymiotnik)',
  freedom: 'wolność (od: free)',
  boredom: 'nuda (od: bore)',
  wisdom: 'mądrość (od: wise)',
  bakery: 'piekarnia (od: bake)',
  childhood: 'dzieciństwo (od: child)',
  optimism: 'optymizm',
  ability: 'zdolność / umiejętność (od: able)',
  happiness: 'szczęście (od: happy)',
  friendship: 'przyjaźń (od: friend)',
  leadership: 'przywództwo / kierownictwo',
  sensitive: 'wrażliwy / drażliwy',
  sensible: 'rozsądny / sensowny',
  cooperative: 'chętny do współpracy / pomocny',
  historic: 'historyczny / zabytkowy (ważny w historii)',
  logical: 'logiczny (przymiotnik od: logic)',
  logic: 'logika (rzeczownik!)',
  helpful: 'pomocny (piszemy przez jedno "l"!)',
  helpless: 'bezradny / bezbronny',
  selfish: 'samolubny / egoistyczny',
  childish: 'dziecinny',
  foolish: 'głupi / nierozsądny',
  nervous: 'zdenerwowany / nerwowy',
  sunny: 'słoneczny (podwójne "n"!)',
  simplify: 'upraszczać (od: simple)',
  clarify: 'wyjaśnić / doprecyzować',
  realize: 'zdać sobie sprawę / zrealizować',
  realise: 'zdać sobie sprawę / zrealizować',
  shorten: 'skrócić (od: short)',
  widen: 'poszerzyć (od: wide)',
  strengthen: 'wzmocnić (od: strength)',
  spilt: 'rozlał / rozlany (Past od: spill)',
  spill: 'rozlać / wylać',
  stain: 'plama',
  carelessly: 'nieostrożnie / niedbale',
  careless: 'nieostrożny / niedbały',
  upset: 'zmartwiony / wytrącony z równowagi',
  iron: 'żelazko / żelazo',
  burn: 'oparzyć się / spalić',
  butcher: 'rzeźnik / sklep mięsny',
  argue: 'kłócić się / argumentować',
  argued: 'kłócił się / pokłócili się',
  drawbacks: 'wady / minusy (synonim: disadvantages)',
  drawback: 'wada / minus',
  fares: 'opłaty za przejazd / bilety (np. air fares)',
  furthermore: 'ponadto / co więcej',
  moreover: 'co więcej / ponadto',
  however: 'jednakże / jednak',
  although: 'chociaż / mimo że (+ pełne zdanie)',
  despite: 'pomimo (+ rzeczownik / -ing, bez "of"!)',
  whereas: 'podczas gdy (kontrast)',
  unless: 'chyba że / jeśli nie (= if not)',
  until: 'dopóki nie / aż do momentu',
  before: 'zanim / przed',
  after: 'po tym jak / po',

  // Core Business & Unit 1-5 Single Words
  acquire: 'przejąć / nabyć (firmę, umiejętności)',
  acquisition: 'przejęcie / nabycie (firmy)',
  compete: 'konkurować / rywalizować',
  competition: 'konkurencja / zawody',
  competitor: 'konkurent / rywal',
  competitors: 'konkurenci / rywale',
  competitive: 'konkurencyjny',
  develop: 'rozwijać / opracować',
  development: 'rozwój / opracowanie',
  expand: 'rozszerzać działalność / rozwijać się',
  expansion: 'ekspansja / rozwój',
  fail: 'ponieść porażkę / nie zdołać czegoś zrobić',
  failure: 'porażka / niepowodzenie',
  grow: 'rosnąć / rozwijać się',
  growth: 'wzrost / rozwój',
  innovate: 'wprowadzać innowacje',
  innovation: 'innowacja',
  innovative: 'innowacyjny (nie "innovating"!)',
  merge: 'połączyć się (o firmach)',
  merger: 'fuzja (połączenie dwóch firm)',
  perform: 'radzić sobie / osiągać wyniki / wykonywać',
  performance: 'wyniki / wydajność / działanie',
  profit: 'zysk / czerpać zysk',
  profitable: 'rentowny / zyskowny / opłacalny',
  profitability: 'rentowność / zyskowność',
  risk: 'ryzyko / ryzykować',
  risks: 'ryzyka / zagrożenia',
  risky: 'ryzykowny (nie "riskable"!)',
  succeed: 'odnieść sukces / udać się',
  success: 'sukces / powodzenie',
  successful: 'odnoszący sukcesy / udany (jedno "l"!)',
  takeover: 'przejęcie firmy (rzeczownik pisany łącznie)',
  rival: 'rywal / konkurent',
  rivals: 'rywale / konkurenci',
  bid: 'oferta kupna / przetarg',
  suffer: 'ucierpieć / ponosić straty',
  suffered: 'ucierpiały (np. sales suffered)',
  greatly: 'znacznie / bardzo mocno',
  cheap: 'tani',
  cheaper: 'tańszy',
  emerging: 'wschodzący / wyłaniający się',
  industry: 'branża / przemysł',
  various: 'różne / rozmaite',
  strategy: 'strategia',
  strategies: 'strategie',
  strategic: 'strategiczny',
  tackle: 'zmierzyć się z (problemem) / stawić czoła',
  survive: 'przetrwać / utrzymać się na rynku',
  suitable: 'odpowiedni / właściwy',
  maintain: 'utrzymać / zachować',
  healthy: 'zdrowy / solidny (np. healthy profit margin)',
  margin: 'marża',
  position: 'pozycja / sytuacja / stanowisko',
  option: 'opcja / wybór',
  accept: 'zaakceptować / przyjąć',
  accepting: 'akceptacja / przyjęcie',
  appeal: 'przemawiać do / podobać się (appeal to)',
  announced: 'ogłosił / ogłoszono',
  announce: 'ogłosić / zapowiedzieć',
  staff: 'personel / pracownicy',
  kept: 'zatrzymał (Past od: keep)',
  chains: 'sieci (np. sklepów)',
  chain: 'sieć (sklepów) / łańcuch',
  poor: 'słaby / niski / biedny',
  quality: 'jakość',
  unhappy: 'niezadowolony',
  redesigned: 'przeprojektowany',
  redesign: 'przeprojektować',
  attract: 'przyciągać (klientów)',
  fewer: 'mniej (dla rzeczowników policzalnych, np. fewer stores)',
  less: 'mniej (dla niepoliczalnych, np. less money)',
  steeper: 'bardziej stromy / gwałtowniejszy (od: steep)',
  steep: 'gwałtowny / stromy',
  launch: 'wprowadzenie na rynek / uruchomić',
  launched: 'wprowadził na rynek',
  regulations: 'przepisy / regulacje',
  state: 'stanowić / stwierdzać / stan',
  wear: 'nosić (ubranie / kask)',
  recommend: 'polecać / rekomendować',
  ideally: 'optymalnie / w idealnym przypadku',
  allowed: 'dozwolony (not allowed = zabroniony)',
  obliged: 'zobowiązany (zmuszony przepisami)',
  frequently: 'często',
  prioritize: 'ustalać priorytety',
  prioritise: 'ustalać priorytety',
  relevant: 'istotny / adekwatny',
  irrelevant: 'nieistotny',
  recession: 'recesja gospodarcza',
  inflation: 'inflacja',
  demand: 'popyt / żądać',
  affects: 'wpływa na (od: affect)',
  affect: 'wpływać na',
  preferences: 'preferencje / upodobania',
  automation: 'automatyzacja',
  stability: 'stabilność',
  instability: 'niestabilność',
  governments: 'rządy',
  tariffs: 'cła / taryfy celne',
  expertise: 'wiedza specjalistyczna / fachowość',
  commitment: 'zaangażowanie / zobowiązanie',
  doable: 'wykonalny (możliwy do zrobienia)',
  recruitment: 'rekrutacja',
  competence: 'kompetencja / umiejętności',
  competent: 'kompetentny',
  outline: 'nakreślić / zarys / plan',
  survey: 'ankieta / badanie opinii',
  impact: 'wpływ (have an impact on)',
  convenience: 'wygoda (convenience store = sklep osiedlowy)',
  convenient: 'wygodny / dogodny',
  pricing: 'ustalanie cen / polityka cenowa',
  pursue: 'realizować (strategię) / dążyć do',
  anticipate: 'przewidywać (z wyprzedzeniem)',
  anticipated: 'przewidywał / spodziewał się',
  confectionery: 'wyroby cukiernicze / słodycze',
  disappointing: 'rozczarowujący',
  disappointed: 'rozczarowany',
  gamble: 'ryzyko / hazard (take a gamble = zaryzykować)',
  overlap: 'pokrywać się / nakładać się (dublowanie)',
  offend: 'urazić / obrazić',
  offended: 'uraził / obraził',
  blunt: 'bezceremonialny / zbyt dosadny',
  dedicate: 'przeznaczyć (zasoby) / poświęcić',
  resources: 'zasoby / środki',
  resolve: 'rozwiązać (problem / konflikt)',
  resolved: 'rozwiązany',
  brief: 'poinstruować / krótko wprowadzić w temat',
  struggle: 'zmagać się (struggle with)',
  priority: 'priorytet (take priority = mieć pierwszeństwo)',
  confront: 'skonfrontować się z kimś',
  impose: 'narzucić (np. swoje rozwiązanie)',
  dismiss: 'zwolnić z pracy / odrzucić',
  affordable: 'przystępny cenowo (od: afford)',
  afford: 'pozwolić sobie finansowo (stać kogoś)',
  downsize: 'zredukować zatrudnienie / zmniejszyć firmę',
  recognizable: 'rozpoznawalny',
  recognisable: 'rozpoznawalny',
  inevitable: 'nieunikniony',
  evaluate: 'ocenić / oszacować ( np. ryzyko)',
  evaluated: 'ocenił / oszacował',
  redundant: 'zwolniony z przyczyn ekonomicznych / zbędny',
  outperform: 'prześcignąć / osiągać lepsze wyniki niż konkurencja',
  collate: 'zestawiać / zbierać razem (np. raporty)',
  collating: 'zestawianie / łączenie (raportów)',
  recall: 'wycofać wadliwy produkt z rynku / przypomnieć sobie',
  recalled: 'wycofany z rynku',
  premises: 'siedziba / lokal / teren firmy (zawsze w l.mn.)',
  rent: 'wynająć / czynsz',
  rented: 'wynajął / wynajęty',
  induction: 'wdrożenie do pracy (induction day)',
  interns: 'stażyści / praktykanci',
  internship: 'staż / praktyki studenckie',
  maternity: 'macierzyński (on maternity leave)',
  devalued: 'zdewaluowany (pozbawiony prestiżu/wartości)',
  venture: 'odważyć się wejść (w ryzykowny rynek) / przedsięwzięcie',
  elicit: 'wydobyć / uzyskać (np. opinie od klientów)',
  prime: 'najlepszy / prestiżowy (prime retail sites)',
  outbound: 'wyjazdowy (outbound tourism)',
  consistent: 'spójny / konsekwentny',
  overnight: 'z dnia na dzień / przez noc',
  clichés: 'banały / oklepane frazesy',
  strike: 'strajk (go on strike)',
  trainee: 'stażysta / praktykant menedżerski',
  logistician: 'logistyk (osoba!)',
  packaging: 'opakowanie ochronne',
  parcel: 'paczka / przesyłka',
  parcels: 'paczki / przesyłki',
  packages: 'paczki / pakiety',
  freight: 'fracht / towar przewożony hurtowo (long-haul freight)',
  subsidiary: 'spółka zależna (należąca do korporacji)',
  deployed: 'wdrożony / rozmieszczony',
  deploy: 'wdrożyć / rozmieścić',
  lorry: 'ciężarówka (UK)',
  lorries: 'ciężarówki',
  pedals: 'pedały (w pojeździe)',
  drones: 'drony',
  withhold: 'wstrzymać (np. płatność)',
  prompt: 'natychmiastowy / niezwłoczny',
  promptly: 'niezwłocznie / szybko',
  fulfil: 'zrealizować (zamówienie) / spełnić',
  fulfilled: 'zrealizowany (o zamówieniu)',
  dispatch: 'wysłać / nadać (towar)',
  dispatched: 'wysłany / nadany',
  conversant: 'obeznany / dobrze zaznajomiony z (conversant with)',
  reconcile: 'pogodzić ze sobą (np. studia ze stażem)',
  receipts: 'paragony / pokwitowania (bills of sale)',
  stock: 'zapasy magazynowe / akcje giełdowe',
  inventory: 'inwentarz / stan magazynowy',
  peers: 'współpracownicy na równym stanowisku / rówieśnicy',
  resentful: 'urażony / pełen żalu i pretensji',
  procrastination: 'odkładanie spraw na później (zwlekanie)',
  overwhelming: 'przytłaczający',
  mentee: 'podopieczny mentora',
  mentees: 'podopieczni mentora',
  volatility: 'zmienność / niestabilność (np. kursów akcji)',
  volatile: 'zmienny / niestabilny',
  pivotal: 'kluczowy / przełomowy',
  saturated: 'nasycony (np. rynek)',
  transparency: 'przejrzystość / transparentność',
  transparent: 'przejrzysty / jawny',
  stakeholders: 'interesariusze (udziałowcy, klienci, pracownicy)',
  differentiate: 'odróżnić / wyróżnić (markę na rynku)',
  workforce: 'kadra pracownicza / siła robocza',
  comprehensive: 'kompleksowy / wszechstronny / wyczerpujący',
  fostering: 'wspieranie / pielęgnowanie (np. kultury nauki)',
  foster: 'wspierać / rozwijać',
  rapport: 'dobre porozumienie / relacja z ludźmi',
  reiterate: 'powtórzyć / ponownie podkreślić',
  bulldoze: 'przeć naprzód bez zwracania uwagi na innych',
  loopholes: 'luki (w prawie lub w czyjejś argumentacji)',
  embark: 'rozpocząć coś dużego (embark on)',
  inferior: 'gorszy jakościowo / niższy rangą',
  malfunctioning: 'wadliwie działający / zepsuty',
  dissatisfaction: 'niezadowolenie',
  satisfaction: 'zadowolenie / satysfakcja',
  employer: 'pracodawca (ten, kto zatrudnia!)',
  employee: 'pracownik (osoba zatrudniona)',
  employees: 'pracownicy',
  restructuring: 'restrukturyzacja (przebudowa firmy)',
  mortgage: 'kredyt hipoteczny (take out a mortgage)',
  incentives: 'bodźce / zachęty finansowe (premie)',
  remuneration: 'wynagrodzenie / płaca (formalne)',
  appointing: 'powołanie / mianowanie (od: appoint)',
  appoint: 'powołać / wyznaczyć na stanowisko',
  suppliers: 'dostawcy',
  supplier: 'dostawca',
  figures: 'dane liczbowe / statystyki finansowe',
  target: 'cel (np. sprzedażowy)',
  targets: 'cele (sprzedażowe)',
  deadline: 'ostateczny termin (deadline)',
  deadlines: 'ostateczne terminy',
  schedule: 'harmonogram / grafik',
  budget: 'budżet',
  quarter: 'kwartał (3 miesiące w roku finansowym)',
  bankrupt: 'zbankrutowany (go bankrupt = zbankrutować)',
  branch: 'oddział / filia firmy',
  attachment: 'załącznik (w mailu)',
  lawyer: 'prawnik',
  contract: 'umowa / kontrakt',
  sign: 'podpisać / znak',
  signed: 'podpisał / podpisany',
  check: 'sprawdzić',
  checked: 'sprawdził / sprawdzony',
  prepare: 'przygotować',
  prepared: 'przygotował / przygotowany',
  ignore: 'ignorować / lekceważyć',
  ignored: 'zignorował',
  interrupt: 'przerywać (komuś w rozmowie)',
  interrupting: 'przerywanie (komuś)',
  waste: 'marnować (czas / pieniądze)',
  lock: 'zamknąć na klucz',
  locked: 'zamknął na klucz',
  shout: 'krzyczeć (shout at = nakrzyczeć na)',
  shouted: 'nakrzyczał',
  fridge: 'lodówka',
  neighbours: 'sąsiedzi',
  neighbour: 'sąsiad',
  loud: 'głośny',
  worried: 'zmartwiony / zaniepokojony',
  hospital: 'szpital',
  swimming: 'pływanie',
  windy: 'wietrzny',
  asleep: 'śpiący (fall asleep = zasnąć)',
  fell: 'spadł / zapadł (Past od: fall)',
  fall: 'spadek / spaść',
  tired: 'zmęczony',
  flight: 'lot',
  missed: 'przegapił / spóźnił się na',
  miss: 'przegapić / spóźnić się',
  composition: 'wypracowanie / rozprawka',
  advantages: 'zalety / plusy',
  advantage: 'zaleta / przewaga',
  disadvantages: 'wady / minusy',
  disadvantage: 'wada / niekorzyść',
  opportunity: 'okazja / szansa / możliwość',
  opportunities: 'szanse / możliwości',
  travel: 'podróżować / podróż',
  travelling: 'podróżowanie',
  countries: 'kraje',
  country: 'kraj',
  aware: 'świadomy (aware of = świadomy czegoś)',
  touch: 'dotykać',
  pet: 'zwierzę domowe',
  awful: 'okropnie / fatalnie',
  stay: 'zostać / zatrzymać się',
  stayed: 'został / zatrzymał się',
  washing: 'zmywanie (do the washing-up = zmywać naczynia)',
  frozen: 'mrożony',
  violent: 'brutalny / pełen przemocy',
  currently: 'obecnie / aktualnie',
  acquiring: 'zdobywanie / nabywanie (od: acquire)',
  completed: 'ukończył / ukończony',
  accounting: 'księgowość / rachunkowość',
  accountancy: 'rachunkowość',
  optional: 'fakultatywny / dodatkowy (do wyboru)',
  conducted: 'prowadzony (od: conduct)',
  lecturers: 'wykładowcy',
  basics: 'podstawy',
  covered: 'obejmował (zakresem)',
  'book-keeping': 'prowadzenie ksiąg rachunkowych',
  recording: 'rejestrowanie / zapisywanie',
  income: 'dochód / przychód',
  costing: 'kalkulacja kosztów',
  acquainted: 'zaznajomiony (get acquainted with = zapoznać się z)',
  suites: 'pakiety (np. software suites = pakiety oprogramowania)',
  independently: 'samodzielnie / niezależnie',
  supervision: 'nadzór',
  assistance: 'pomoc / wsparcie',
  lectures: 'wykłady',
  assignments: 'zadania / projekty do wykonania',
  performed: 'wykonywany',
  strict: 'ścisły / rygorystyczny (strict deadlines)',
  pressure: 'presja (under pressure)',
  stressful: 'stresujący',
  managed: 'zdołał / poradził sobie (manage to do)',
  requirements: 'wymagania',
  requirement: 'wymóg',
  session: 'sesja (egzaminacyjna) / szkolenie',
  practised: 'ćwiczył / wykorzystywał w praktyce',
  setting: 'otoczenie / środowisko (business setting)',
  particularly: 'szczególnie / zwłaszcza',
  permanent: 'stały (permanent position = stała posada)',
  interact: 'wchodzić w interakcje / współpracować z',
  trust: 'ufać / wierzyć / zaufanie',
  lean: 'szczupły / oszczędny (lean management)',
  thesis: 'praca dyplomowa (Bachelor thesis = praca licencjacka)',
  lack: 'brak (lack of = brak czegoś)',
  familiar: 'zaznajomiony (familiar with)',
  environment: 'środowisko / otoczenie',
  etiquette: 'etykieta / zasady zachowania',
  prove: 'udowodnić / sprawdzić się',
  foreign: 'zagraniczny / obcy',
  demanding: 'wymagający',
  appreciated: 'doceniony (od: appreciate)',
  appreciate: 'doceniać',
  duties: 'obowiązki służbowe',
  duty: 'obowiązek / cło',
  greeting: 'witanie (klientów)',
  visitors: 'goście / odwiedzający',
  records: 'rejestr / dokumentacja',
  presently: 'obecnie',
  considering: 'rozważający (consider + V-ing)',
  proficiency: 'biegłość językowa',
  obvious: 'oczywisty',
  seemingly: 'pozornie / na pierwszy rzut oka',
  instruction: 'instruktaż / polecenie',
  recover: 'odzyskać (np. pewność siebie)',
  confidence: 'pewność siebie / zaufanie',
  advise: 'doradzać (czasownik!)',
  advice: 'rada / porada (rzeczownik niepoliczalny!)',
  focused: 'skupiony (focused on)',
  threats: 'groźby / zagrożenia',
  threat: 'zagrożenie / groźba',
  abuse: 'nadużycie / znęcanie się / obelgi',
  seek: 'szukać / zabiegać o (seek support)',
  support: 'wsparcie / wspierać',
  coach: 'szkolić / trenować',
  nurture: 'rozwijać / pielęgnować (talenty)',
  climb: 'wspinać się (climb the career ladder)',
  motivation: 'motywacja',
  receive: 'otrzymać / odebrać',
  gathering: 'zbieranie / gromadzenie',
  efficient: 'wydajny / efektywny',
  efficiency: 'wydajność / efektywność',
  recommendations: 'rekomendacje / zalecenia',
  policy: 'polityka firmy / zasady',
  turnover: 'rotacja (staff turnover) / obrót finansowy',
  approach: 'podejść do (problemu) / podejście',
  monitoring: 'monitorowanie / śledzenie',
  amid: 'pośród / w obliczu (np. napięć)',
  tensions: 'napięcia',
  navigating: 'nawigowanie / radzenie sobie z',
  uncertainties: 'niepewności',
  strengthened: 'wzmocnił (od: strengthen)',
  marketplace: 'rynek',
  recognize: 'uznawać / rozpoznawać',
  skilled: 'wykwalifikowany (highly skilled)',
  investing: 'inwestowanie',
  abilities: 'zdolności / umiejętności',
  enabling: 'umożliwiając (od: enable)',
  enable: 'umożliwić',
  continuous: 'ciągły / nieprzerwany',
  express: 'wyrazić (np. niezadowolenie)',
  potential: 'potencjalny / potencjał',
  invited: 'zaprosił / zaproszony',
  interview: 'rozmowa kwalifikacyjna / wywiad',
};

// Build dynamic lookup index at startup
const PHRASE_MAP = new Map<string, { en: string; pl: string; note?: string }>();
const WORD_MAP = new Map<string, { en: string; pl: string; note?: string }>();

function registerEntry(rawEn: string, rawPl: string, note?: string) {
  const cleanEn = rawEn
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();
  if (!cleanEn) return;

  // Split by "/" or "," if multiple variants are given in one entry
  const parts = cleanEn.split(/\s*[/,]\s*/).map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const lower = part.toLowerCase().replace(/^[to\s]+/, '');
    if (!lower || lower === '-') continue;
    if (lower.includes(' ')) {
      if (!PHRASE_MAP.has(lower)) {
        PHRASE_MAP.set(lower, { en: part, pl: rawPl, note });
      }
    } else {
      if (!WORD_MAP.has(lower)) {
        WORD_MAP.set(lower, { en: part, pl: rawPl, note });
      }
    }
  }
}

// 1. Seed from CORE_DICTIONARY
for (const [k, pl] of Object.entries(CORE_DICTIONARY)) {
  const lower = k.toLowerCase().trim();
  if (lower.includes(' ')) {
    PHRASE_MAP.set(lower, { en: k, pl });
  } else {
    WORD_MAP.set(lower, { en: k, pl });
  }
}

// 2. Seed from ALL_FLASHCARDS (customList + core + videos)
for (const card of ALL_FLASHCARDS) {
  registerEntry(card.en, card.pl, card.tip);
}

// 3. Seed from NOUN_TO_ADJECTIVE_TABLE
for (const row of NOUN_TO_ADJECTIVE_TABLE) {
  registerEntry(row.base, `${row.basePl} ( → przym.: ${row.adjective})`, row.rule);
  registerEntry(row.adjective, `${row.collocationPl} (${row.collocation})`, row.rule);
  if (row.negativeOrOther) {
    registerEntry(row.negativeOrOther, `forma pokrewna od: ${row.base} (${row.basePl})`, row.rule);
  }
  registerEntry(row.collocation, row.collocationPl, row.rule);
}

// 4. Seed from UNIT4_WORD_BUILDING & ALL_WORD_FAMILIES
for (const row of UNIT4_WORD_BUILDING) {
  registerEntry(row.verb, row.pl, row.trap);
  registerEntry(row.noun, row.pl, row.trap);
  registerEntry(row.adjective, row.pl, row.trap);
}
for (const fam of ALL_WORD_FAMILIES) {
  registerEntry(fam.verb, fam.pl, fam.trap);
  registerEntry(fam.noun, fam.pl, fam.trap);
  registerEntry(fam.adjective, fam.pl, fam.trap);
  if (fam.adverb) registerEntry(fam.adverb, fam.pl, fam.trap);
}

const IRREGULAR_LEMMAS: Record<string, string> = {
  fell: 'fall',
  fallen: 'fall',
  took: 'take',
  taken: 'take',
  kept: 'keep',
  lost: 'lose',
  led: 'lead',
  spent: 'spend',
  bought: 'buy',
  sold: 'sell',
  went: 'go',
  gone: 'go',
  made: 'make',
  built: 'build',
  spilt: 'spill',
  paid: 'pay',
  said: 'say',
  told: 'tell',
  knew: 'know',
  known: 'know',
  thought: 'think',
  brought: 'bring',
  caught: 'catch',
  taught: 'teach',
  found: 'find',
  left: 'leave',
  met: 'meet',
  sent: 'send',
  wrote: 'write',
  written: 'write',
  spoke: 'speak',
  spoken: 'speak',
  chose: 'choose',
  chosen: 'choose',
  grew: 'grow',
  grown: 'grow',
  rose: 'rise',
  risen: 'rise',
  drove: 'drive',
  driven: 'drive',
  flew: 'fly',
  flown: 'fly',
  lying: 'lie',
};

function findSingleWord(rawWord: string): { en: string; pl: string; note?: string } | null {
  const w = rawWord.toLowerCase().replace(/^['’]+|['’]+$/g, '');
  if (w.length < 3) return null;

  if (WORD_MAP.has(w)) return WORD_MAP.get(w)!;

  // Check irregular lemma
  if (IRREGULAR_LEMMAS[w] && WORD_MAP.has(IRREGULAR_LEMMAS[w])) {
    return WORD_MAP.get(IRREGULAR_LEMMAS[w])!;
  }

  // Stemming candidates
  const candidates: string[] = [];
  if (w.endsWith('ies') && w.length > 4) candidates.push(w.slice(0, -3) + 'y');
  if (w.endsWith('ied') && w.length > 4) candidates.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es') && w.length > 4) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
  }
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    candidates.push(w.slice(0, -1));
  }
  if (w.endsWith('ed') && w.length > 4) {
    const stem = w.slice(0, -2);
    candidates.push(stem);
    candidates.push(stem + 'e');
    if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
      candidates.push(stem.slice(0, -1));
    }
  }
  if (w.endsWith('ing') && w.length > 5) {
    const stem = w.slice(0, -3);
    candidates.push(stem);
    candidates.push(stem + 'e');
    if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
      candidates.push(stem.slice(0, -1));
    }
  }
  if (w.endsWith('ly') && w.length > 4) {
    candidates.push(w.slice(0, -2));
    if (w.endsWith('ily')) candidates.push(w.slice(0, -3) + 'y');
  }
  if (w.endsWith('er') && w.length > 4) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
    if (w.endsWith('ier')) candidates.push(w.slice(0, -3) + 'y');
  }
  if (w.endsWith('est') && w.length > 5) {
    candidates.push(w.slice(0, -3));
    candidates.push(w.slice(0, -2));
    if (w.endsWith('iest')) candidates.push(w.slice(0, -4) + 'y');
  }

  for (const c of candidates) {
    if (WORD_MAP.has(c)) return WORD_MAP.get(c)!;
  }

  return null;
}

export function lookupWordWithContext(
  prevWord: string | null,
  currentWord: string,
  nextWord: string | null,
  nextNextWord: string | null
): DictionaryHit | null {
  const cur = currentWord.toLowerCase();
  const prev = prevWord?.toLowerCase() ?? '';
  const next = nextWord?.toLowerCase() ?? '';
  const next2 = nextNextWord?.toLowerCase() ?? '';

  // 1. Check 3-word phrases containing currentWord
  const threeCandidates = [
    prev && next ? `${prev} ${cur} ${next}` : '',
    next && next2 ? `${cur} ${next} ${next2}` : '',
  ].filter(Boolean);

  for (const phrase of threeCandidates) {
    if (PHRASE_MAP.has(phrase)) {
      const hit = PHRASE_MAP.get(phrase)!;
      return { matchedText: phrase, en: hit.en, pl: hit.pl, note: hit.note };
    }
  }

  // 2. Check 2-word phrases containing currentWord
  const twoCandidates = [
    next ? `${cur} ${next}` : '',
    prev ? `${prev} ${cur}` : '',
  ].filter(Boolean);

  for (const phrase of twoCandidates) {
    if (PHRASE_MAP.has(phrase)) {
      const hit = PHRASE_MAP.get(phrase)!;
      return { matchedText: phrase, en: hit.en, pl: hit.pl, note: hit.note };
    }
  }

  // 3. Check single word (with stemming/lemmatization)
  const single = findSingleWord(currentWord);
  if (single) {
    return {
      matchedText: currentWord,
      en: single.en,
      pl: single.pl,
      note: single.note,
    };
  }

  return null;
}
