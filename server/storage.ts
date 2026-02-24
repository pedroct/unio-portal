import type {
  Professional,
  Patient,
  PatientGoals,
  NutritionSummary,
  BiometrySummary,
  TrainingSummary,
  PatientOverview,
  InsightCard,
} from "@shared/schema";

const professionals: Professional[] = [
  {
    id: "prof-1",
    name: "Dr. Rafael Mendes",
    registrationNumber: "CRM-12345",
    uf: "SP",
    specialty: "Médico do Esporte",
    email: "rafael.mendes@unio.health",
  },
];

const patients: Patient[] = [
  {
    id: "p1",
    name: "Ana Carolina Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    birthDate: "1992-03-15",
    gender: "F",
    age: 33,
    adherenceTraining: 85,
    adherenceDiet: 72,
    lastActivity: "Há 2 horas",
    status: "active",
  },
  {
    id: "p2",
    name: "Bruno Oliveira Santos",
    email: "bruno.santos@email.com",
    phone: "(21) 97654-3210",
    birthDate: "1988-07-22",
    gender: "M",
    age: 37,
    adherenceTraining: 92,
    adherenceDiet: 88,
    lastActivity: "Há 1 hora",
    status: "active",
  },
  {
    id: "p3",
    name: "Camila Rodrigues",
    email: "camila.r@email.com",
    phone: "(31) 96543-2109",
    birthDate: "1995-11-08",
    gender: "F",
    age: 30,
    adherenceTraining: 45,
    adherenceDiet: 60,
    lastActivity: "Há 3 dias",
    status: "active",
  },
  {
    id: "p4",
    name: "Diego Ferreira Lima",
    email: "diego.lima@email.com",
    phone: "(41) 95432-1098",
    birthDate: "1990-01-30",
    gender: "M",
    age: 36,
    adherenceTraining: 78,
    adherenceDiet: 55,
    lastActivity: "Ontem",
    status: "active",
  },
  {
    id: "p5",
    name: "Elena Martins Costa",
    email: "elena.costa@email.com",
    phone: "(51) 94321-0987",
    birthDate: "1985-09-12",
    gender: "F",
    age: 40,
    adherenceTraining: 30,
    adherenceDiet: 40,
    lastActivity: "Há 2 semanas",
    status: "inactive",
  },
];

const patientGoals: Record<string, PatientGoals> = {
  p1: { dailyCalories: 1800, protein: 130, carbs: 200, fat: 55, hydration: 2500, hydrationOverride: false },
  p2: { dailyCalories: 2800, protein: 200, carbs: 350, fat: 80, hydration: 3500, hydrationOverride: true },
  p3: { dailyCalories: 1600, protein: 110, carbs: 180, fat: 50, hydration: 2200, hydrationOverride: false },
  p4: { dailyCalories: 2400, protein: 180, carbs: 280, fat: 70, hydration: 3000, hydrationOverride: false },
  p5: { dailyCalories: 1500, protein: 100, carbs: 160, fat: 45, hydration: 2000, hydrationOverride: false },
};

function generateNutritionHistory(): { date: string; calories: number; protein: number; carbs: number; fat: number }[] {
  const history = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    history.push({
      date: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      calories: 1500 + Math.floor(Math.random() * 800),
      protein: 80 + Math.floor(Math.random() * 80),
      carbs: 150 + Math.floor(Math.random() * 120),
      fat: 40 + Math.floor(Math.random() * 40),
    });
  }
  return history;
}

function generateBiometryHistory(): { date: string; weight: number; bodyFat: number; muscleMass: number; water: number }[] {
  const history = [];
  let weight = 78;
  let bodyFat = 18;
  let muscleMass = 35;
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    weight += (Math.random() - 0.55) * 0.6;
    bodyFat += (Math.random() - 0.55) * 0.4;
    muscleMass += (Math.random() - 0.45) * 0.3;
    history.push({
      date: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      weight: Math.round(weight * 10) / 10,
      bodyFat: Math.round(bodyFat * 10) / 10,
      muscleMass: Math.round(muscleMass * 10) / 10,
      water: Math.round((55 + Math.random() * 5) * 10) / 10,
    });
  }
  return history;
}

function generateTrainingSessions() {
  const sessions = [];
  const names = [
    "Treino A - Superior",
    "Treino B - Inferior",
    "Treino C - Full Body",
    "Treino A - Push",
    "Treino B - Pull",
    "Treino C - Legs",
    "Cardio HIIT",
    "Treino Funcional",
  ];
  const now = new Date();
  for (let i = 14; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    if (Math.random() > 0.3) {
      sessions.push({
        id: `s${i}`,
        date: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        name: names[Math.floor(Math.random() * names.length)],
        duration: 40 + Math.floor(Math.random() * 40),
        volumeLoad: 2000 + Math.floor(Math.random() * 4000),
        rpe: 5 + Math.floor(Math.random() * 5),
        completed: Math.random() > 0.15,
        exercises: 4 + Math.floor(Math.random() * 5),
      });
    }
  }
  return sessions;
}

export interface IStorage {
  authenticate(registrationNumber: string, uf: string, password: string): Promise<{ professional: Professional; tokens: { access: string; refresh: string } } | null>;
  getPatients(): Promise<Patient[]>;
  getPatient(id: string): Promise<Patient | undefined>;
  getPatientGoals(patientId: string): Promise<PatientGoals | undefined>;
  updatePatientGoals(patientId: string, goals: PatientGoals): Promise<PatientGoals>;
  getPatientOverview(patientId: string): Promise<PatientOverview | undefined>;
  getPatientNutrition(patientId: string): Promise<NutritionSummary | undefined>;
  getPatientBiometry(patientId: string): Promise<BiometrySummary | undefined>;
  getPatientTraining(patientId: string): Promise<TrainingSummary | undefined>;
}

export class MemStorage implements IStorage {
  async authenticate(registrationNumber: string, uf: string, password: string) {
    if (!registrationNumber || !uf || !password) {
      return null;
    }

    if (password.replace(/\D/g, "").length < 11) {
      return null;
    }

    const professional = professionals[0];
    return {
      professional,
      tokens: {
        access: "mock-access-token-" + Date.now(),
        refresh: "mock-refresh-token-" + Date.now(),
      },
    };
  }

  async getPatients(): Promise<Patient[]> {
    return patients;
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    return patients.find((p) => p.id === id);
  }

  async getPatientGoals(patientId: string): Promise<PatientGoals | undefined> {
    return patientGoals[patientId];
  }

  async updatePatientGoals(patientId: string, goals: PatientGoals): Promise<PatientGoals> {
    patientGoals[patientId] = goals;
    return goals;
  }

  async getPatientOverview(patientId: string): Promise<PatientOverview | undefined> {
    const patient = patients.find((p) => p.id === patientId);
    const goals = patientGoals[patientId];
    if (!patient || !goals) return undefined;

    const insights: InsightCard[] = [
      {
        id: "ins-1",
        type: "warning",
        title: "Queda na ingestão de proteína",
        description: "A média de consumo de proteína nos últimos 5 dias está 22% abaixo da meta. Isso pode impactar a recuperação muscular.",
        module: "nutrition",
      },
      {
        id: "ins-2",
        type: "success",
        title: "Aderência ao treino excelente",
        description: "O paciente completou 4 de 5 sessões programadas esta semana, mantendo a regularidade.",
        module: "training",
      },
      {
        id: "ins-3",
        type: "info",
        title: "Tendência de composição corporal",
        description: "A massa muscular apresentou ganho de 0.4kg nas últimas 4 semanas, com gordura corporal estável.",
        module: "biometry",
      },
    ];

    return {
      patient,
      goals,
      insights,
      weeklySnapshot: {
        caloriesAvg: Math.round(goals.dailyCalories * (0.7 + Math.random() * 0.3)),
        caloriesTarget: goals.dailyCalories,
        trainingSessions: 4,
        trainingTarget: 5,
        hydrationAvg: Math.round(goals.hydration * (0.6 + Math.random() * 0.4)),
        hydrationTarget: goals.hydration,
        weightChange: -0.3,
      },
    };
  }

  async getPatientNutrition(patientId: string): Promise<NutritionSummary | undefined> {
    const goals = patientGoals[patientId];
    if (!goals) return undefined;

    const history = generateNutritionHistory();
    const todayEntry = history[history.length - 1];

    return {
      dailyCalories: todayEntry.calories,
      targetCalories: goals.dailyCalories,
      protein: { current: todayEntry.protein, target: goals.protein },
      carbs: { current: todayEntry.carbs, target: goals.carbs },
      fat: { current: todayEntry.fat, target: goals.fat },
      adherencePercent: 72 + Math.floor(Math.random() * 20),
      history,
    };
  }

  async getPatientBiometry(patientId: string): Promise<BiometrySummary | undefined> {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return undefined;

    const history = generateBiometryHistory();
    const latest = history[history.length - 1];

    return {
      current: {
        weight: latest.weight,
        bodyFat: latest.bodyFat,
        muscleMass: latest.muscleMass,
        water: latest.water,
      },
      history,
      trends: {
        weight: "down",
        bodyFat: "down",
        muscleMass: "up",
      },
    };
  }

  async getPatientTraining(patientId: string): Promise<TrainingSummary | undefined> {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return undefined;

    const sessions = generateTrainingSessions();
    const completed = sessions.filter((s) => s.completed);

    return {
      totalSessions: sessions.length,
      weeklyAverage: Math.round((sessions.length / 2) * 10) / 10,
      adherencePercent: Math.round((completed.length / sessions.length) * 100),
      sessions,
    };
  }
}

export const storage = new MemStorage();
