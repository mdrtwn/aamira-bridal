import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "../../../aamirabasic/ProductDetail";
import { findProduct, products } from "../../../aamirabasic/catalog";

export function generateStaticParams(){ return products.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:Readonly<{params:Promise<{slug:string}>}>):Promise<Metadata>{
  const {slug}=await params;
  const product=findProduct(slug);
  if (!product) return {title:"Product not found",robots:{index:false,follow:false}};
  return {
    title:product.name,
    description:product.description,
    openGraph:{
      title:product.name,
      description:product.description,
      images:product.images.slice(0,1),
      type:"website",
    },
  };
}
export default async function ProductPage({params}:Readonly<{params:Promise<{slug:string}>}>){ const {slug}=await params; const product=findProduct(slug); if(!product) notFound(); return <ProductDetail product={product}/>; }
