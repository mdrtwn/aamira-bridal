import Hero from "../aamirabasic/Hero";
import ShopByCategory from "../aamirabasic/ShopByCategory";
import NewArrivals from "../aamirabasic/NewArrivals";
import EditorialBanner from "../aamirabasic/EditorialBanner";
import Bestsellers from "../aamirabasic/Bestsellers";
import Newsletter from "../aamirabasic/Newsletter";

export default function BasicPage() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <NewArrivals />
      <EditorialBanner />
      <Bestsellers />
      <Newsletter />
    </>
  );
}