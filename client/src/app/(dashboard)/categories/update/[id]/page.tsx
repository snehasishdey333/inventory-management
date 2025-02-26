import CategoryUpdateForm from "@/components/forms/CategoryUpdateForm"
import { fetchCategory } from "@/utils/api";


const UpdateCategoryPage = async({params}: { params: Promise<{ id: string }> }) => {
  
  const { id } = await params
  const data=await fetchCategory({data:{id:id}});

  return (
    <CategoryUpdateForm data={data}/>
  )
}

export default UpdateCategoryPage

