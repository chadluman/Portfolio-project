import fs from "fs/promises";
import path from "path";

export type Reservation = {
  id: string;
  reservationName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  experience: string;
  notes: string;
  status: string;
  adminResponse: string;
  createdAt: string;
  updatedAt: string;
};

const dataDirectory = path.join(
  process.cwd(),
  "other projects",
  "hot air balloon",
  "server",
  "data",
);

const dataFile = path.join(dataDirectory, "reservations.json");

const ensureDataFile = async () => {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
};

export const readReservations = async (): Promise<Reservation[]> => {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as Reservation[];
};

export const writeReservations = async (reservations: Reservation[]) => {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(reservations, null, 2), "utf8");
};

export const validateReservation = (payload: Record<string, unknown>) => {
  const requiredFields = [
    "reservationName",
    "email",
    "phone",
    "date",
    "time",
    "partySize",
    "experience",
  ];

  const missingField = requiredFields.find(
    (field) => !String(payload[field] ?? "").trim(),
  );

  if (missingField) {
    return `${missingField} is required.`;
  }

  return null;
};
