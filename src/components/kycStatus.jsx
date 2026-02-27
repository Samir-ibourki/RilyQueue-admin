import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const statuses = ["ALL", "PENDING", "APPROVED", "REJECTED"]

export default function AgentManagement() {
  const [agents, setAgents] = useState([])
  const [filter, setFilter] = useState("ALL")
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAgents()
  }, [filter, page])

  const fetchAgents = async () => {
    const res = await fetch(`/api/agents?status=${filter}&page=${page}`)
    const data = await res.json()
    setAgents(data)
  }

  const updateStatus = async (id, status) => {
    const confirmAction = window.confirm(
      `Êtes-vous sûr de vouloir ${status === "APPROVED" ? "approuver" : "refuser"} cet agent ?`
    )

    if (!confirmAction) return

    await fetch(`/api/agents/${id}/kyc`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })

    fetchAgents()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Agents</h1>

      {/* Filtre */}
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Statut KYC</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td className="border p-2">{agent.name}</td>
              <td className="border p-2">{agent.email}</td>
              <td className="border p-2 font-semibold">
                {agent.kycStatus}
              </td>
              <td className="border p-2 space-x-2">
                {agent.kycStatus === "PENDING" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateStatus(agent.id, "APPROVED")}
                    >
                      Approuver
                    </Button>

                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => updateStatus(agent.id, "REJECTED")}
                    >
                      Refuser
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Précédent
        </Button>

        <span>Page {page}</span>

        <Button onClick={() => setPage(page + 1)}>
          Suivant
        </Button>
      </div>
    </div>
  )
}