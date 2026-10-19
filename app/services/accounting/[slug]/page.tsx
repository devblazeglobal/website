import { subRoute } from "@/lib/sub-route";

const r = subRoute("accounting");
export const dynamicParams = false;
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
