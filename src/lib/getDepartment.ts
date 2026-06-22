export function getDepartment(category: string) {
  switch (category) {
    case "Road":
      return "Public Works";

    case "Streetlight":
      return "Electrical Department";

    case "Garbage":
      return "Sanitation Department";

    case "Water":
      return "Water Department";

    case "Electricity":
      return "Electricity Department";

    default:
      return "General Department";
  }
}
