export type BloodStock = {
  type: string | null;
  rhFactor: string | null;
  quantity: number;
};

export type AppointmentReviewDto = {
  id: number;
  status: string;
  equipmentSetsUsed: number;
  bloodStock: BloodStock;
  description: string;
};

export type AppointmentPreviewDto = {
  id: number;
  startTime: string;
  endTime: string;
  bloodBankId: number;
  bloodBankName: string;
};
