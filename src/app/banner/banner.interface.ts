export interface IBannerInterface {
  _id?: any;
  banner_image: string;
  public_id: string;
  banner_status: "active" | "in-active";
  banner_path: string;
  banner_serial: number;
}