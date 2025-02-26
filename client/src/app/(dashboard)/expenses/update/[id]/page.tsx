import ExpenseUpdateForm from "@/components/forms/ExpenseUpdateForm"
import { fetchExpense } from "@/utils/api"



const UpdateExpensesPage = async({params}: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const data=await fetchExpense({data:{id:id}})
  
  return (
    <ExpenseUpdateForm data={data}/>
  )
}

export default UpdateExpensesPage