import React, { useState } from "react";
import { useTeams } from "../../routes/teams/TeamsContext";
import "./TeamsDashboard.css";
import { NavLink } from "react-router-dom";
export default function TeamsDashboard() {
  const {
    paginatedTeams,
    allMembers,
    assignMemberToTeam,
    removeMemberFromTeam,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTeams();

  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const handleAssign = (memberId: number) => {
    if (selectedTeamId !== null) assignMemberToTeam(selectedTeamId, memberId);
  };

  const handleRemove = (memberId: number) => {
    if (selectedTeamId !== null) removeMemberFromTeam(selectedTeamId, memberId);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard des Équipes</h1>

      <div className="sort-buttons">
        <button onClick={() => setSortBy("title")}>🔤 Trier par Titre</button>
        <button onClick={() => setSortBy("memberCount")}>👥 Trier par Membres</button>
           <NavLink to="/" className="home-button">
        🏠 Accueil
      </NavLink>
      </div>

      <div className="teams-list">
        {paginatedTeams.map(team => (
          <div key={team.id} className="team-card">
            <h2>{team.title}</h2>
            <p className="description">{team.body}</p>
            <div className="members">
              <strong>Membres assignés ({team.assignedMemberIds.length}):</strong>
              <div>
                {team.assignedMemberIds.length === 0 ? (
                  <p>Aucun membre assigné</p>
                ) : (
                  team.assignedMemberIds.map(id => {
                    const member = allMembers.find(m => m.id === id);
                    return member ? (
                      <span key={id} className="member-badge">{member.name}</span>
                    ) : null;
                  })
                )}
              </div>
            </div>
            <button className="manage-button" onClick={() => setSelectedTeamId(team.id)}>
              Gérer les Membres
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <p>Page: {currentPage} / {totalPages}</p>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          ◀️ Précédent
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant ▶️
        </button>
      </div>

      {selectedTeamId && (
        <div className="manage-members">
          <h3>👥 Gérer les membres pour l'équipe #{selectedTeamId}</h3>
          {allMembers.map(member => {
            const isAssigned = paginatedTeams
              .find(t => t.id === selectedTeamId)
              ?.assignedMemberIds.includes(member.id);
            return (
              <div key={member.id} className="member-line">
                <span>{member.name}</span>
                <button onClick={() => setSelectedMember(member)}>Détails</button>
                {isAssigned ? (
                  <button onClick={() => handleRemove(member.id)}>Désassigner</button>
                ) : (
                  <button onClick={() => handleAssign(member.id)}>Assigner</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedMember && (
        <div className="member-details-modal">
          <h3>📋 Détails du Membre</h3>
          <ul>
            <li><strong>ID:</strong> {selectedMember.id}</li>
            <li><strong>Username:</strong> {selectedMember.username}</li>
            <li><strong>Name:</strong> {selectedMember.name}</li>
            <li><strong>Email:</strong> {selectedMember.email}</li>
            <li><strong>Téléphone:</strong> {selectedMember.phone}</li>
            <li><strong>Site Web:</strong> {selectedMember.website}</li>
            <li><strong>Adresse:</strong> {selectedMember.address.street}, {selectedMember.address.suite}, {selectedMember.address.city}, {selectedMember.address.zipcode}</li>
          </ul>
          <button onClick={() => setSelectedMember(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}
