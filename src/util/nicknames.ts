import crypto from "crypto";

const nicknames = generateNicknames();

function generateNicknames(): string[] {
  const adjectives = [
    "Flying",
    "Hopeful",
    "Gentle",
    "Brave",
    "Clever",
    "Wise",
    "Mighty",
    "Swift",
    "Fierce",
    "Noble",
    "Sneaky",
    "Sly",
    "Witty",
    "Charming",
    "Elegant",
    "Graceful",
    "Radiant",
    "Vibrant",
    "Lively",
    "Sparkling",
    "Glowing",
    "Shimmering",
    "Dazzling",
    "Enchanting",
    "Magical",
    "Mystical",
    "Whimsical",
    "Dreamy",
    "Fantastical",
    "Otherworldly",
    "Ethereal",
    "Heavenly",
    "Divine",
    "Sacred",
    "Blessed",
    "Holy",
    "Peaceful",
    "Tranquil",
    "Serene",
    "Calm",
    "Relaxing",
    "Soothing",
    "Comforting",
    "Cozy",
    "Warm",
    "Friendly",
    "Welcoming",
    "Inviting",
    "Charming",
    "Delightful",
    "Enchanting",
    "Captivating",
    "Alluring",
  ];

  const nouns = [
    "Lion",
    "Tiger",
    "Bear",
    "Wolf",
    "Fox",
    "Rabbit",
    "Deer",
    "Horse",
    "Elephant",
    "Giraffe",
    "Zebra",
    "Monkey",
    "Gorilla",
    "Snake",
    "Crocodile",
    "Shark",
    "Octopus",
    "Spider",
    "Scorpion",
    "Dragon",
    "Phoenix",
    "Unicorn",
    "Mermaid",
    "Wizard",
    "Witch",
    "Knight",
    "Pirate",
    "Detective",
    "Doctor",
    "Nurse",
    "Teacher",
    "Chef",
    "Mechanic",
    "Engineer",
    "Scientist",
    "Astronaut",
    "Athlete",
    "Musician",
    "Actor",
    "Artist",
    "Writer",
    "Photographer",
    "Journalist",
    "Entrepreneur",
    "Lawyer",
    "Politician",
    "Banker",
    "Accountant",
    "Salesperson",
  ];

  let nicknames = [];
  for (let i = 0; i < adjectives.length; ++i) {
    for (let j = 0; j < nouns.length; ++j) {
      nicknames.push(`${adjectives[i]} ${nouns[j]}`);
    }
  }
  return nicknames;
}

function simpleHashFunction(key: string): number {
  return Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function getArrayIndex(key: string, arraySize: number): number {
  const hashValue = simpleHashFunction(key);
  const arrayIndex = hashValue % arraySize;
  return arrayIndex;
}

export function getUserNickname(email: string) {
  return nicknames[getArrayIndex(email, nicknames.length)];
}
