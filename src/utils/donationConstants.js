export const RadioButtonItems = [
  {
    type: "ramadan",
    title: "Palliative Care/Chronic Illness/Elderly",
    description: {
      title: "Palliative care/Chronic Illness/Elderly:",
      para1:
        "If you are in palliative care, have a chronic illness or are elderly, and fasting is extremely difficult and detrimental to your health, you are exempt from Ramadan fasting. You must offer Fidyah as an expiation, which is to provide one meal to a poor person for each day missed. To calculate the total Fidyah amount, simply multiply the missed days by the cost of one meal, which is {{FEED1}}.",
    },
    content1: `Allah says (interpretation of the meaning): “And as for those who can fast with difficulty, (e.g. an old man), they have (a choice either to fast or) to feed a Miskeen (poor person) (for every day)”” [al-Baqarah 2:184]
  “Allah burdens not a person beyond his scope” [al-Baqarah 2:286]
  “and [Allah] has not laid upon you in religion any hardship” [al-Hajj 22:78]
  Allah knows best.
  `,
    calculateAmount: true,
    initialAmount: "feedPrice",
    initialAmountTitle: "Cost for One Day",
    quantity: 1,
    itemTitle: "Total Day Cost",
    counter: true,
    counterTitle: "Missed Fasting Days",
  },
  {
    type: "ramadan",
    title: "Deliberately Breaking Fast With No Excuse",
    description: {
      title: "Deliberately Breaking Fast With No Excuse:",
      para1:
        "If you had the intention to fast from the night before and began your fast for the day but broke it without a valid excuse during the day, you are required to make up for that missed day. This is because you initiated the fast, and it becomes likened to a vow that you must fulfill. There is no expiation in this case.",
      para2:
        "The one who breaks his fast with no excuse must repent to Allah, regret what he has done, resolve to never do it again, and do a lot of righteous deeds such as giving in charity, observing nafl fasts and so on.",
    },
    content1: `“And as for those who can fast with difficulty, (e.g. an old man), they have (a choice either to fast or) to feed a Miskeen (poor person) (for every day)”. [al-Baqarah 2:184]
  “Allah burdens not a person beyond his scope” [al-Baqarah 2:286]
  “and [Allah] has not laid upon you in religion any hardship” [al-Hajj 22:78].
  
  Allah knows best.
  `,
    costforOneDay: false,
    costPerPerson: false,
    counter: false,
    amount: true, //[10, 20, 30, 50],
    hasTabs: false,
    generalDonation: false,
  },
  {
    type: "ramadan",
    title: "Intimacy With Spouse During Ramadan",
    description: {
      title: "Intimacy With Spouse During Ramadan:",
      para1:
        "Expiation applies if you break your fast by having intercourse with your spouse during the day, you must make up the day as well as-in this order:",
      list: [
        "Free a slave. If you cannot do so,",
        "Fast two consecutive months. If that is not possible,",
        "Feed sixty poor person at a cost of {{FEED1}} per person.",
      ],
      para2: "This applies to each day it occurs.",
    },
    perPerson: false,
    counter: false,
    hasTabs: true,
    tabs: [
      {
        tabName: "Fasting",
        head: "Priority option:",
        content1: "Fasting for 2 consecutive months + day broken",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
      {
        tabName: "Feed 60 Needy",
        head: "Disclaimer:",
        content1: "Only select this option if you are unable to fast.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        initialAmountTitle: "Per Person",
        quantity: 60,
        itemTitle: "Feed 60 Poor Person",
        feedType: "FEED60",
      },
    ],
  },
  {
    type: "ramadan",
    title: "Temporary Sickness Or Travel",
    description: {
      title: "Temporary Sickness or Travel:",
      para1:
        "If you couldn't fast during Ramadan due to a valid reason such as illness or travel, you must make up for the number of days you did not fast after Ramadan. No expiation is required.",
    },
    content1:
      "Make up for each day missed after Ramadan at the earliest convenience",
    amount: true, //[10, 20, 30, 50],
    generalDonation: true,
  },
  {
    type: "ramadan",
    title: "Pregnant Woman And Breastfeeding Mothers",
    description: {
      title: "Pregnant Woman and Breastfeeding Mothers:",
      para1:
        "Scholars have different rulings concerning the pregnant woman and breastfeeding mothers if they do not fast Ramadan. These are the various opinions:",
      subTitle1: "Make Up the Fasts : That they must make up the fasts only.",
      subTitle2:
        "Make Up the Fasts and Feed the Needy : That they must make up the fasts only.",
      subTitle3:
        "That they must feed one poor person per day missed only, and do not have to make up the fasts.",
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Feed Only",
        head: "Feed the Needy Only :",
        content1:
          "That they must feed one poor person per day missed only, and do not have to make up the fasts.",
        content2:
          "Among the Sahaabah, this was the view of ‘Abd-Allah ibn ‘Abbaas (may Allah be pleased with him). Ibn Qudaamah also narrated this in al-Mughni (3/37) from Ibn ‘Umar (may Allah be pleased with him).",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 1,
        itemTitle: "Cost Per Days",
        initialAmountTitle: "Cost Per Person",
        counter: true,
        counterTitle: "Day Count",
        feedType: "FEED1",
      },
      {
        tabName: "Feed & Fasting",
        head: "Make Up the Fasts and Feed the Needy :",
        content1:
          "If they fear for their own health, they must make up the fast only. However, if they fear for their child's well-being, they should not only make up the fasts but also feed one poor person for each missed day. ",
        content2:
          "This is the view of Imam al-Shaafa’i and Imam Ahmad. Al-Jassaas also narrated this from Ibn ‘Umar (may Allah be pleased with him). ",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 1,
        itemTitle: "Cost Per Days",
        initialAmountTitle: "Cost Per Person",
        counter: true,
        feedType: "FEED1",
        counterTitle: "Missed Fasting Days",
      },
      {
        tabName: "Fasting",
        head: "Make Up the Fasts : That they make up the fasts only.",
        content1:
          "This is the view of Imam Abu Haneefah (may Allah have mercy on him). Among the Sahaabah, it was the view of ‘Ali ibn Abi Taalib (may Allah be pleased with him). No expiation - {{fedyahAmounts}} - optional general donation",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
    ],
  },
  {
    type: "kaffarah",
    title: "Kaffarah Feed 10 Poor People",
    description: {
      title: "Kaffarah Feed 10 Poor People",
      para1:
        "Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance. These are the three options.",
    },

    calculateAmount: true,
    initialAmount: "feedPrice",
    quantity: 10,
    itemTitle: "Feed 10 Poor Person",
    initialAmountTitle: "Per Person",
    feedType: "FEED10",
  },
  {
    type: "kaffarah",
    title: "Kaffarah Clothe 10 Poor People",

    description: {
      title: "Kaffarah Clothe 10 Poor People",
      head: `Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance.`,

      para1:
        "Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance. These are the three options.",
    },
    calculateAmount: true,
    initialAmount: "clothePrice",
    quantity: 10,
    itemTitle: "Clothe 10 Poor People",
    initialAmountTitle: "Per Person",
    feedType: "CLOTHE10",
  },
  {
    type: "kaffarah",
    title: "Fast 3 Days",
    content1: `It is not allowed to resort to fasting if you can perform one of the above.
  `,
    description: {
      head: `Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance.`,

      title: "Fast 3 Days:",
      para1:
        "It is not allowed to resort to fasting if you can perform one of the above.",
    },
  },
  {
    type: "vows",
    title: "Vows Made In Desperation/Anger",
    description: {
      title: "Vows Made In Desperation/Anger:",
      para1:
        "This means when someone makes an oath to emphasize, they'll do or not do something, but they don't really intend to make a vow . For example, in anger, someone might say, If I ever do this, I have to go for Hajj, fast for a month, or give a {{currency}}500 in charity. But they didn't mean to do those things; they just wanted to stress they wouldn't do that action. You have two choices:",
      subTitle1: "Fulfill the vow",
      subTitle2: "Offer kaffarat yamin( as the vow was essentially an oath) :",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Fulfill Vow",
        content1:
          "Fulfill the Vow - Vows made in Islam out of desperation or anger are sacred commitments. Fulfilling them is obligatory, reflecting integrity and accountability before Allah (swt).",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
      {
        tabName: "Feed",
        content1:
          "Kaffarah - Kaffarah in Islam: Feeding 10 poor individuals as an expiation for certain actions or oaths, embodying compassion and fulfilling religious obligations.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
      },
      {
        tabName: "Clothe",
        content1:
          "Kaffarah: Providing clothing for 10 impoverished individuals as an act of expiation, reflecting compassion and fulfilling religious duties.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
  {
    type: "vows",
    title: "Non-Specific Vows",
    description: {
      title: "Non-Specific Vows:",
      para1:
        "In some instances, someone may make a vow without specifying its purpose. For example, they might say, I vow that if Allah grants me this job, without providing any specific details. In such cases, you must offer kaffarat yamin .",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Feed",
        content1:
          "Kaffarah - Kaffarah in Islam: Feeding 10 poor individuals as an expiation for certain actions or oaths, embodying compassion and fulfilling religious obligations.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
        activeTab: true,
      },
      {
        tabName: "Clothe",
        content1: "Kaffarah - clothe 10 poor.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
  {
    type: "vows",
    title: "Vows To Items Without Ownership",
    description: {
      title: "Vows Involving Things You Don’t Own:",
      para1:
        "When a person makes a vow related to something they don't possess, they are required to offer kaffarah. For instance, if someone offers a home to stay in that they don’t have access to, or to give a car that you don’t own to someone. They must offer kaffarat yamen",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Feed",
        content1: "Kaffarah - feed 10 poor people.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
        activeTab: true,
      },
      {
        tabName: "Clothe",
        content1:
          "Kaffarah: Providing clothing for 10 impoverished individuals as an act of expiation, reflecting compassion and fulfilling religious duties.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
];

export const listItems = [
  {
    title: "Shallow Water Well",
    tooltip: {
      head: "Shallow Water Well:",
      content:
        "Shallow Water Wells provides clean and safe access to water for numerous underprivileged communities in rural areas",
      specifications: ["Hand pump", "Dedication plaque"],
      depth: 10,
      lifeSpan: "Upto 2yrs",
    },
    cost: "shallowWaterPrice",
    countries: "shallowWaterCountries",
    type: "SHALLOW_WATER_WELL",
  },
  {
    title: "Deep Water Well",
    tooltip: {
      head: "Deep Water Wells:",
      content:
        "Investing in a deep water Well can make a significant impact on an entire village by providing access to clean and safe water",
      specifications: ["Submersible pump", "Dedication plaque"],
      depth: 40,
      lifeSpan: "Minimum 10 years",
    },
    cost: "deepWaterPrice",
    countries: "deepWaterCountries",
    type: "DEEP_WATER_WELL",
  },
  {
    title: "Deep Water Well With Water Station",
    tooltip: {
      head: "Deep Water Well:",
      content:
        "The water well runs deep underground, and in addition to this, it features a water station equipped with eight taps and a 1000-liter water tank that stores the water being pumped.",
      specifications: [
        "8 water taps",
        "2 dedication plaque",
        "Ceramic floor and wall tiles",
        "1000ltr water tank",
      ],
      depth: 40,
      lifeSpan: "Minimum 10 years",
    },
    cost: "deepWaterStationPrice",
    countries: "deepWaterStationCountries",
    type: "DEEP_WATER_STATION",
  },
];
export const projectsSortList = [
  { label: "Newest", value: "desc" },
  { label: "Oldest", value: "asc" },
  { label: "Popular", value: "asc" },
];