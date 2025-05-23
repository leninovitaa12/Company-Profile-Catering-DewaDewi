"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthContext } from "../context/AuthContext"
import useGetTestimoni from "../hook/useGetTestimoni"
import { Sidebar, PageHeader, Card, Button } from "../components/ui/ui-components"
import { TestimoniIcon, PlusIcon } from "../components/ui/icons"
import TestimoniAdd from "../components/TestimoniAdd"
import TestimoniItem from "../components/TestimoniItem"

const Testimoni = () => {
  const { authUser } = useAuthContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const { testimonis, loadings, error, refetch } = useGetTestimoni()

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  }

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div
      className="flex min-h-screen bg-[#F1EFDC]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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

        <motion.div className="flex-1 p-4 md:p-6" variants={itemVariants}>
          <div className="max-w-6xl mx-auto space-y-6">
            <AnimatePresence mode="wait">
              {showAddForm ? (
                <motion.div
                  key="add-form"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Tambah Testimoni Baru" className="border border-[#D36B00]/20">
                    <TestimoniAdd onSuccess={() => setShowAddForm(false)} refetch={refetch} />
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="testimoni-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="Galeri Testimoni">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5"></div>
                    <TestimoniItem testimonis={testimonis} loading={loadings} error={error} refetch={refetch} />
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Testimoni
