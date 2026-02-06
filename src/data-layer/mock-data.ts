// Mock data for testing without API key
export const mockWordData = {
  term: "serendipity",
  sound: {
    all: "/ˌserənˈdɪpɪti/"
  },
  commonness: 3.14,
  syllableData: {
    count: 5,
    list: ["ser", "en", "dip", "i", "ty"]
  },
  meanings: [
    {
      text: "The occurrence and development of events by chance in a happy or beneficial way.",
      category: "noun",
      similar: ["chance", "luck", "fortune", "coincidence"],
      opposite: ["misfortune", "bad luck"],
      samples: [
        "A fortunate stroke of serendipity brought the two old friends together after 20 years.",
        "The discovery of penicillin was a happy accident of serendipity."
      ]
    }
  ]
}

export const mockWordData2 = {
  term: "ephemeral",
  sound: {
    all: "/ɪˈfemərəl/"
  },
  commonness: 2.87,
  syllableData: {
    count: 4,
    list: ["e", "phem", "er", "al"]
  },
  meanings: [
    {
      text: "Lasting for a very short time; transitory.",
      category: "adjective",
      similar: ["temporary", "fleeting", "transient", "momentary"],
      opposite: ["permanent", "eternal", "lasting"],
      samples: [
        "The beauty of cherry blossoms is ephemeral, lasting only a few weeks.",
        "Fame can be ephemeral in the modern age of social media."
      ]
    }
  ]
}
