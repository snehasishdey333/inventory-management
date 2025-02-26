import ProductUpdateForm from "@/components/forms/ProductUpdateForm";
import { fetchProduct } from "@/utils/api";




const UpdateProductPage = async({params}: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const data=await fetchProduct({data:{id:id}})
    

    return (
        <ProductUpdateForm data={data}/>
    );
};

export default UpdateProductPage;
