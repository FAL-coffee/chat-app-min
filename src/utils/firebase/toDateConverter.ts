import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
  Timestamp,
} from "firebase/firestore";

interface DocumentSnapshotType {
  [key: string]: any | Timestamp;
}

export const toDateConverter = <
  T extends DocumentSnapshotType
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<DocumentSnapshotType>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => {
    const data = snapshot.data();
    Object.keys(data).forEach((key) => {
      // Timestamp型の値をDate型に変換する
      if (
        typeof data[key].toString == "function" &&
        data[key].toString().startsWith("Timestamp")
      ) {
        (data as DocumentSnapshotType)[key] = data[key].toDate();
      }
    });

    return data;
  },
});
