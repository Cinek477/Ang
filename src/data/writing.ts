import type { WritingTask } from './types';

export const WRITING_TASKS: WritingTask[] = [
  {
    id: 'u4-report',
    tag: 'Unit 4.5 · KOLOS',
    isKolosPriority: true,
    title: 'Report: Reporting Problems, Reasons and Results',
    minWords: 160,
    maxWords: 200,
    prompt:
      'Write a short report extract (approx. 180 words) outlining three main problems faced by a mobile phone company (or retail chain) over the last year, giving details of the reasons and results. Use linking phrases from Unit 4.5 and at least two comparative structures.',
    bulletPoints: [
      'Brief introduction stating the aim of the report',
      'Problem 1 (e.g. Falling sales / strong competition) + reason + result',
      'Problem 2 (e.g. Customer service / product quality) + reason + result',
      'Problem 3 (e.g. Rising costs / staff issues) + reason + result',
    ],
    checklist: [
      'Krótki wstęp ("This report aims to outline...")',
      'Użyte łączniki przyczyny (due to / because of / as a result of / in order to)',
      'Użyte łączniki skutku (has led to / resulting in / therefore / as a result)',
      'Co najmniej 2 porównania (np. much lower, fewer customers, longer and longer)',
      'Długość w okolicach 160–200 słów + czytelne nagłówki / punkty',
    ],
    usefulPhrases: [
      {
        group: 'Introduction',
        items: [
          'The company has faced several challenges over the last year.',
          'This report aims to outline the main problem areas and reasons for them.',
        ],
      },
      {
        group: 'Reasons (Przyczyny)',
        items: [
          'This seems to be mainly because of...',
          'Sales have fallen due to...',
          'As a result of increased competition, ...',
          'We carried out a survey in order to find out...',
        ],
      },
      {
        group: 'Results (Skutki)',
        items: [
          'This has led to very negative customer feedback.',
          'Therefore, many customers have switched to rival brands.',
          '...resulting in a significantly lower profit margin.',
          'As a result, fewer customers are buying from us.',
        ],
      },
    ],
    modelAnswer: `Report on current problems

The company has faced several serious challenges over the last year. This report aims to outline the main problem areas, the reasons behind them, and their impact on our performance.

• Falling sales and competition
Last year, sales decreased significantly. This seems to be mainly due to the arrival of a new rival offering much lower prices and more innovative product lines. As a result, we have lost market share, and fewer customers are choosing our brand.

• Customer service
Staff numbers were reduced six months ago in order to cut costs. However, this has led to longer and longer waiting times in our stores. Therefore, customer complaints have increased considerably, resulting in negative online reviews.

• Product quality
A recent software update caused battery issues in our flagship model. Because of this technical failure, many devices had to be recalled, which has resulted in lower profits and damaged our brand reputation.`,
  },
  {
    id: 'u4-pest',
    tag: 'Unit 4.2 · KOLOS',
    isKolosPriority: true,
    title: 'Short PEST Analysis of a Company',
    minWords: 150,
    maxWords: 200,
    prompt:
      'Write a short PEST analysis of a company or organisation you know well (e.g. a tech startup, food delivery app, or supermarket chain). Include a brief introduction, key Political, Economic, Social and Technological factors, and a conclusion with recommendations using modal verbs (must, have to, should, shouldn’t).',
    bulletPoints: [
      'Introduction: brief description of the company',
      'P / E / S / T factors affecting the business',
      'Conclusion: most relevant factors + recommended actions (modal verbs!)',
    ],
    checklist: [
      'Opis firmy w 1–2 zdaniach',
      'Uwzględnione wszystkie 4 obszary (Political, Economic, Social, Technological)',
      'Użyte czasowniki modalne w konkluzji (must, have to, should, shouldn’t)',
      'Słownictwo z Unit 4 (corporate tax, inflation, consumer preferences, emerging technologies)',
    ],
    usefulPhrases: [
      {
        group: 'PEST Vocabulary',
        items: [
          'Political factors include employment laws and corporate taxes.',
          'High inflation and a possible recession affect consumer demand.',
          'Changing consumer preferences towards eco-friendly solutions...',
          'Emerging technologies such as AI and automation...',
        ],
      },
      {
        group: 'Conclusion & Modal Verbs',
        items: [
          'In conclusion, the company must adapt to...',
          'Management should prioritise technological innovation.',
          'The company mustn’t ignore changing customer needs.',
          'We don’t have to cut prices if we improve quality.',
        ],
      },
    ],
    modelAnswer: `PEST Analysis: FreshBox (Food Delivery Startup)

FreshBox is a medium-sized Polish startup delivering healthy, ready-to-eat meals in major cities.

• Political: Strict food safety regulations and changing employment laws increase operational costs. Higher minimum wages directly affect delivery expenses.
• Economic: High inflation has pushed up ingredient prices, while reduced household budgets make customers far more price-sensitive.
• Social: Growing health awareness and busier lifestyles increase demand for convenient organic meals, especially among young professionals.
• Technological: Mobile ordering apps and AI-based route optimisation help cut delivery times and reduce fuel costs.

Conclusion:
The most relevant factors are inflation and changing consumer preferences. FreshBox must keep its food quality high while automating logistics in order to cut costs. Management should introduce more affordable subscription plans and mustn’t miss opportunities to expand into smaller cities.`,
  },
  {
    id: 'u5-complaint',
    tag: 'Unit 5.5',
    title: 'Formal Letter of Complaint (Missing / Damaged Order)',
    minWords: 170,
    maxWords: 200,
    prompt:
      'Write a formal letter of complaint (approx. 180 words) to a supplier regarding an incorrect and partially damaged delivery (e.g. office desks or IT hardware). State the problem, give details, state your demand (e.g. collect faulty goods / withhold payment), and close formally.',
    bulletPoints: [
      'Para 1: State what was ordered and when ("on the understanding that...")',
      'Para 2: Extra details (damaged items, unhelpful driver / no response from customer service)',
      'Para 3: Demand (immediate response, replacement or withholding payment)',
      'Para 4: Desired outcome ("to our mutual satisfaction", "prompt response")',
    ],
    checklist: [
      'Formalne rozpoczęcie (Dear Sir or Madam / Dear Sirs) i zakończenie (Yours faithfully)',
      'Użyte łączniki kontrastu z Unit 5.5 (Although / Despite / However)',
      'Wyraźne żądanie (withhold payment / collect the faulty items / cancel the order)',
      'Brak form skróconych (don’t → do not, can’t → cannot)',
    ],
    usefulPhrases: [
      {
        group: 'Problem & Details',
        items: [
          'Last week we ordered [50 monitors] on the understanding that they would be delivered by Monday.',
          'Although you assured us that the goods would arrive on time, only 30 units were delivered.',
          'Despite sending several emails, we have had no response from your customer service department.',
        ],
      },
      {
        group: 'Demand & Closing',
        items: [
          'If you do not respond to this letter immediately, we shall be forced to withhold payment.',
          'We request that you collect the damaged goods from our warehouse.',
          'We sincerely hope that this situation will be resolved to our mutual satisfaction.',
          'We look forward to receiving your prompt response.',
        ],
      },
    ],
    modelAnswer: `Dear Sirs,

Re: Order #4587 for 50 office monitors

Last week, we ordered 50 monitors for our Kraków branch on the understanding that they would be delivered on Monday. Although you assured us that you could meet this deadline, the shipment arrived three days late.

Furthermore, only 35 units were delivered and, of those, four were badly damaged in transit due to insufficient packaging. We tried to contact your customer service department several times; however, our calls were not answered. Despite sending three urgent emails, we have received no response so far.

We are very disappointed, as we have been loyal customers for many years. If you do not resolve this situation immediately, we shall have no alternative but to withhold payment, look for another supplier, and request that you collect the damaged equipment from our warehouse.

We sincerely hope that this matter can be resolved to our mutual satisfaction. We look forward to receiving your prompt response.

Yours faithfully,
Marek Kowalski
Purchasing Manager`,
  },
  {
    id: 'agh-mock1-email',
    tag: 'AGH Mock 1',
    title: 'Diplomatic Email: Internship Inconveniences',
    minWords: 180,
    maxWords: 200,
    prompt:
      'Your internship supervisor (Jan Kowalski from HR) sent you a memo asking about your negative experience during the internship in the company as he heard some rumour. In a diplomatic way write an email describing inconveniences you faced during the placement (180–200 words). Elaborate on three problems regarding: 1. logistics, 2. communication, 3. manager.',
    bulletPoints: [
      'Polite opening referring to Jan Kowalski’s memo',
      'Problem 1: Logistics (e.g. workstation setup, access cards, schedule)',
      'Problem 2: Communication (e.g. unclear task instructions, lack of updates)',
      'Problem 3: Manager (e.g. limited availability / lack of regular feedback)',
      'Constructive, diplomatic closing',
    ],
    checklist: [
      'Zwrot grzecznościowy do Jana Kowalskiego (Dear Mr Kowalski,)',
      'Dyplomatyczny, profesjonalny ton (bez agresywnego narzekania)',
      'Rozwinięte wszystkie 3 punkty: logistics, communication, manager',
      'Ścisły limit słów: 180–200 słów!',
    ],
    usefulPhrases: [
      {
        group: 'Opening & Diplomatic Tone',
        items: [
          'Dear Mr Kowalski, Thank you for reaching out regarding my recent internship.',
          'Overall, I valued the opportunity; however, I encountered a few minor challenges.',
          'I would like to share some constructive feedback that may help future interns.',
        ],
      },
      {
        group: 'Softening Criticism',
        items: [
          'Regarding logistics, it took slightly longer than expected to...',
          'In terms of communication, clearer guidelines would have been very helpful.',
          'While my manager was knowledgeable, his busy schedule meant that...',
        ],
      },
      {
        group: 'Closing',
        items: [
          'I hope you find these observations helpful.',
          'Kind regards / Best regards,',
        ],
      },
    ],
    modelAnswer: `Dear Mr Kowalski,

Thank you for your memo and for taking the time to ask about my recent internship. Overall, I truly appreciate the opportunity to gain hands-on experience at your company. However, I would like to share a few constructive observations regarding some inconveniences I encountered.

First, regarding logistics, my workstation and system access were not ready until the second week of my placement. Having these essentials prepared earlier would have helped me contribute more effectively from the beginning.

Second, in terms of communication, task expectations and deadlines were occasionally unclear. Receiving brief written summaries or having short weekly check-ins would have prevented minor misunderstandings within the team.

Finally, although my manager was very professional, his demanding schedule meant that he was rarely available for guidance or regular feedback. Even short mentoring sessions would have significantly improved my learning curve.

I hope these remarks are helpful in enhancing the internship programme for future students. Please let me know if you would like to discuss any of these points further.

Kind regards,
Alex Nowak`,
  },
  {
    id: 'agh-mock2-apology',
    tag: 'AGH Mock 2',
    title: 'Formal Letter of Apology (Equipment Complaint)',
    minWords: 180,
    maxWords: 200,
    prompt:
      'You are the manager of a company specialising in selling and renting equipment for conference rooms and concert halls. Your client (Hugo Johnson) complained about: 1. a three-day delivery delay, 2. malfunctioning projector and speakers that ruined a planned conference, 3. resolution/compensation. Write a FORMAL letter of apology (180–200 words). Develop each issue in a separate paragraph.',
    bulletPoints: [
      'Formal opening + sincere apology (Dear Mr Johnson,)',
      'Paragraph 1: Explain the reasons for the three-day delay',
      'Paragraph 2: Address the malfunctioning projector and speakers',
      'Paragraph 3: Offer concrete compensation / resolution',
      'Formal sign-off (Yours sincerely,)',
    ],
    checklist: [
      'Styl FORMALNY (brak skrótów typu I’m, don’t, can’t!)',
      'Osobny akapit na każdy z 3 pogrubionych punktów',
      'Konkretna forma rekompensaty (np. wymiana sprzętu + zwrot/zniżka)',
      'Ścisły limit słów: 180–200 słów!',
    ],
    usefulPhrases: [
      {
        group: 'Formal Apology',
        items: [
          'Dear Mr Johnson,',
          'I am writing in response to your letter regarding your recent order.',
          'Please accept our sincere apologies for the inconvenience and disruption caused.',
        ],
      },
      {
        group: 'Explaining Issues',
        items: [
          'The three-day delay was caused by an unexpected disruption at our logistics partner.',
          'Regarding the malfunctioning projector and speakers, our quality control team has investigated the issue.',
        ],
      },
      {
        group: 'Compensation & Closing',
        items: [
          'As a gesture of goodwill, we would like to offer you a full replacement and a 30% refund.',
          'We value your business and look forward to restoring your trust in our company.',
          'Yours sincerely,',
        ],
      },
    ],
    modelAnswer: `Dear Mr Johnson,

I am writing in response to your letter regarding the equipment purchased from our company last month. Please accept our sincere apologies for the inconvenience and the disruption to your planned conference.

Firstly, the three-day delivery delay was caused by an unexpected logistical disruption with our external courier service. We deeply regret that you were not informed promptly so that your team could adjust its schedule accordingly.

Secondly, we are extremely concerned to hear that the projector and speakers were malfunctioning. After investigating the matter, we discovered that a faulty batch had bypassed our standard quality control check. We have already implemented stricter inspection procedures to prevent this from happening again.

In order to resolve this matter swiftly, we will dispatch brand-new, thoroughly tested replacement equipment free of charge within twenty-four hours. Furthermore, as a gesture of goodwill and compensation for the cancelled event, we would like to offer you a thirty percent refund on your invoice.

We truly value your business and hope to restore your confidence in our services.

Yours sincerely,
Anna Swindon`,
  },
];
