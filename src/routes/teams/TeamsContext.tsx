import React, { createContext, useContext, useState, useEffect } from "react";

export type Member = {
  id: number;
  name: string;
  email: string;
};

export type Team = {
  id: number;
  title: string;
  body: string;
  assignedMemberIds: number[];
};

type TeamsContextType = {
  allTeams: Team[];
  paginatedTeams: Team[];
  allMembers: Member[];
  fetchTeams: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  assignMemberToTeam: (teamId: number, memberId: number) => void;
  removeMemberFromTeam: (teamId: number, memberId: number) => void;
  setSortBy: (key: keyof Team | "memberCount") => void;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  totalPages: number;
  currentPage: number;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [sortKey, setSortKey] = useState<keyof Team | "memberCount">("title");

  useEffect(() => {
    fetchTeams();
    fetchMembers();
  }, []);

  const fetchTeams = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    const formatted: Team[] = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      assignedMemberIds: [],
    }));
    setAllTeams(formatted);
  };

  const fetchMembers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setAllMembers(data);
  };

  const assignMemberToTeam = (teamId: number, memberId: number) => {
    setAllTeams(prev =>
      prev.map(team =>
        team.id === teamId && !team.assignedMemberIds.includes(memberId)
          ? { ...team, assignedMemberIds: [...team.assignedMemberIds, memberId] }
          : team
      )
    );
  };

  const removeMemberFromTeam = (teamId: number, memberId: number) => {
    setAllTeams(prev =>
      prev.map(team =>
        team.id === teamId
          ? { ...team, assignedMemberIds: team.assignedMemberIds.filter(id => id !== memberId) }
          : team
      )
    );
  };

  const sortedTeams = [...allTeams].sort((a, b) => {
    if (sortKey === "memberCount") {
      return b.assignedMemberIds.length - a.assignedMemberIds.length;
    }

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    } else {
      return 0;
    }
  });

  const paginatedTeams = sortedTeams.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(allTeams.length / pageSize);

  return (
    <TeamsContext.Provider
      value={{
        allTeams,
        paginatedTeams,
        allMembers,
        fetchTeams,
        fetchMembers,
        assignMemberToTeam,
        removeMemberFromTeam,
        setSortBy: setSortKey,
        setCurrentPage,
        pageSize,
        totalPages,
        currentPage,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) throw new Error("useTeams must be used within a TeamsProvider");
  return context;
};
