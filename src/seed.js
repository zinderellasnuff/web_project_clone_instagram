import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function seedDatabase(firestore) {
  const users = [
    {
      userId: "Dv7ADrBh0qYNMoSVkVKkPPMtodw2",
      username: "sameer",
      fullName: "Sameer Kapadia",
      emailAddress: "kapadia.sameer1@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "karlos",
      fullName: "Karlos Finlay",
      emailAddress: "karlos@finlay.com",
      following: [],
      followers: ["Dv7ADrBh0qYNMoSVkVKkPPMtodw2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "daniel",
      fullName: "Daniel Salvador",
      emailAddress: "daniel@salvador.com",
      following: [],
      followers: ["Dv7ADrBh0qYNMoSVkVKkPPMtodw2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "stefan",
      fullName: "Stefan George",
      emailAddress: "stefan@george.com",
      following: [],
      followers: ["Dv7ADrBh0qYNMoSVkVKkPPMtodw2"],
      dateCreated: Date.now(),
    },
  ];

  const photos = [
    {
      photoId: 1,
      userId: "2",
      imageSrc: `/images/users/sameer/1.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        { displayName: "daniel", comment: "Love this place, looks like my animal farm!" },
        { displayName: "stefan", comment: "Would you mind if I used this picture?" },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    },
    {
      photoId: 2,
      userId: "2",
      imageSrc: `/images/users/karlos/1.jpg`,
      caption: "Exploring the mountains",
      likes: [],
      comments: [
        { displayName: "sameer", comment: "Incredible view!" },
        { displayName: "stefan", comment: "Looks like a great adventure!" },
      ],
      userLatitude: "34.0522°",
      userLongitude: "118.2437°",
      dateCreated: Date.now(),
    },
    {
      photoId: 3,
      userId: "3",
      imageSrc: `/images/users/daniel/1.jpg`,
      caption: "City lights at night",
      likes: [],
      comments: [
        { displayName: "stefan", comment: "Amazing shot!" },
        { displayName: "karlos", comment: "The city looks so vibrant!" },
      ],
      userLatitude: "51.5074°",
      userLongitude: "0.1278°",
      dateCreated: Date.now(),
    },
    {
      photoId: 4,
      userId: "4",
      imageSrc: `/images/users/stefan/1.jpg`,
      caption: "Charming village in the countryside",
      likes: [],
      comments: [
        { displayName: "daniel", comment: "Feels like a fairytale!" },
        { displayName: "karlos", comment: "So peaceful and calm." },
      ],
      userLatitude: "41.9028°",
      userLongitude: "12.4964°",
      dateCreated: Date.now(),
    },
  ];

  // Agrega los usuarios, evitando duplicados
  for (const user of users) {
    const userRef = doc(collection(firestore, "users"), user.userId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, user);
    }
  }

  // Agrega fotos, evitando duplicados
  for (const photo of photos) {
    const photoRef = doc(collection(firestore, "photos"), photo.photoId.toString());
    const docSnap = await getDoc(photoRef);
    if (!docSnap.exists()) {
      await setDoc(photoRef, photo);
    }
  }
}
