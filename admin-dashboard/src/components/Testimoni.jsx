import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import useGetTestimoni from "../hook/useGetTestimoni"
import { Sidebar, PageHeader, Card, Button } from "../components/ui/ui-components"
import { TestimoniIcon, PlusIcon, CalendarIcon } from "../components/ui/icons"
import TestimoniAdd from "./TestimoniAdd"
import TestimoniItem from "./TestimoniItem"

const Testimoni = () => {
  const { authUser } = useAuthContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const { testimonis, loadings, error, refetch } = useGetTestimoni()

  return (
    <div className="flex min-h-screen bg-[#F1EFDC]">
      {/* Sidebar */}
      <Sidebar activePage="testimoni" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <PageHeader
          title="Manajemen Testimoni"
          icon={<TestimoniIcon />}
          actions={
            <Button
              variant="primary"
              size="sm"
              icon={<PlusIcon />}
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#D36B00] hover:bg-[#42032C] text-white"
            >
              {showAddForm ? "Tutup Form" : "Tambah Testimoni"}
            </Button>
          }
        />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {showAddForm ? (
              <Card title="Tambah Testimoni Baru" className="border border-[#D36B00]/20">
                <TestimoniAdd onSuccess={() => setShowAddForm(false)} refetch={refetch} />
              </Card>
            ) : (
              <Card title="Galeri Testimoni">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
                </div>
                <TestimoniItem testimonis={testimonis} loading={loadings} error={error} refetch={refetch} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimoni
