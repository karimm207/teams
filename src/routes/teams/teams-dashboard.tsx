import TeamsDashboard from "../../pages/TeamsDashboard/TeamsDashboard";
import { TeamsProvider } from "../teams/TeamsContext";

export default function TeamsRoute() {
  return (
    <TeamsProvider>
      <TeamsDashboard />
    </TeamsProvider>
  );
}
