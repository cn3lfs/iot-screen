import "./index.scss";
import TitleAndLogo from "@/component/TitleAndLogo";
import ShortBox from "@/component/ShortBox";
import ProductionLineData from "@/component/ProductionLineData";
import DeviceStatus from "@/component/DeviceStatus";
import EquipmentOperatingRate from "@/component/EquipmentOperatingRate";
import EquipmentUtilizationRate from "@/component/EquipmentUtilizationRate";

function Home() {
  return (
    <div className="App">
      <TitleAndLogo></TitleAndLogo>
      <div
        className="d-flex justify-content-around"
        style={{
          marginTop: 35,
        }}
      >
        <ProductionLineData></ProductionLineData>
        <DeviceStatus></DeviceStatus>
        <div className="d-flex flex-column justify-content-between">
          <EquipmentOperatingRate></EquipmentOperatingRate>
          <EquipmentUtilizationRate></EquipmentUtilizationRate>
        </div>
      </div>
    </div>
  );
}

export default Home;
