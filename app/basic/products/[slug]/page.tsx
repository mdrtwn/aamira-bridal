import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "../../../aamirabasic/ProductDetail";
import { findProduct, products } from "../../../aamirabasic/catalog";

export function generateStaticParams(){ return products.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:Readonly<{params:Promise<{slug:string}>}>):Promise<Metadata>{ const {slug}=await params; const product=findProduct(slug); return {title:product?`${product.name} | Aamira Basic`:"Product not found"}; }
export default async function ProductPage({params}:Readonly<{params:Promise<{slug:string}>}>){ const {slug}=await params; const product=findProduct(slug); if(!product) notFound(); return <ProductDetail product={product}/>; }
