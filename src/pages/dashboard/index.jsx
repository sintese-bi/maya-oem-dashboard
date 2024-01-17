// IMPORTS
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reportAdministratorRule } from "src/reports/reportsRules/reportAdministratorRule";
import { TotalMonth } from "src/components/dashboard/total-month/total-month";

// QUERYS
import { getUserCookie } from "src/services/session";
import {
  getDashboard,
  getCapacities,
  getAllDevices,
} from "src/store/actions/users";
import { numbers } from "src/helpers/utils";

// COMPONENTS / LIBS DE ESTILOS
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";
import { TopUsins } from "src/components/dashboard/top-usins/topUsins";
import { PaymentWarn } from "src/components/shared/PaymentWarn";
import { MayaWatchPro } from "src/components/shared/MayaWatchPro";

// ASSETS
import { Cancel } from "@mui/icons-material";
import moment from "moment";
import { MyDevices } from "src/components/dashboard/my-devices/my-devices";
import { DashboardHeader } from "src/components/dashboard/dashboard-header/dashboard-header";
import { bigNumberSum } from "src/store/actions/devices";
import { LocationUsins } from "src/components/dashboard/location-usins/locationUsins";
import { MyUsins } from "src/components/dashboard/my-usins/myUsins";
import { ListUsins } from "src/components/dashboard/list-usins/listUsins";
import { PeriodDataUsins } from "src/components/dashboard/period-data-usins/periodDataUsins";
import AlertDevices from "src/components/alerts/AlertDevices";
import { BigNumbers } from "src/components/dashboard/big-numbers/bigNumbers";
import { DashboardContext } from "src/contexts/dashboard-context";

export default function Dashboard() {
  const {
    isLoadingReportGeneration,
    data,
    type,
    userData,
    usersAPIData,
    startDate,
    endDate,
    optionFilter,
    realGenerationTotal,
    estimatedGenerationTotal,
    monthEconomyTotal,
    treesSavedTotal,
    realGenerationFiltered,
    estimatedGenerationFiltered,
    percentGenerationFiltered,
    realGenerationLastDay,
    estimatedGenerationLastDay,
    percentLastDay,
    usinsByState,
    setIsLoadingReportGeneration,
    setData,
    setType,
    setStartDate,
    setEndDate,
    setOptionFilter,
    handleGenerationTotalValues,
    handleGenerationLastDayValues,
    handleGenerationFilteredValues,
    handleAdminReportGeneration,
  } = useContext(DashboardContext);
  const navigate = useNavigate();

  // PROPS DE CONTROLLER
  const { useUuid, useName, profileLevel, useTypeMember } = getUserCookie();

  if (profileLevel !== "admin") {
    navigate("/dashboard/devices");
  }

  const { bignumbersumValues } = useSelector((state) => state.devices);

  const devicesTableRef = useRef(null);
  const adminGraphRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [capacityTotal, setCapacityTotal] = useState(0);

  // condição de carregamento, caso os dados da dashboard n estejam pronto, uma tela de carregamento é acionada

  if (usersAPIData.isAllDevicesDataLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={usersAPIData.isAllDevicesDataLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            height: "100%",
          }}
        >
          <MyUsins
            realGenerationTotal={realGenerationTotal}
            estimatedGenerationTotal={estimatedGenerationTotal}
            realGenerationLastDay={realGenerationLastDay}
            estimatedGenerationLastDay={estimatedGenerationLastDay}
            percentLastDay={percentLastDay}
            allDevices={usersAPIData.allDevices}
            brands={usersAPIData.brands}
            notDefined={usersAPIData.notDefined}
            unactived={usersAPIData.unactived}
            online={usersAPIData.online}
            offline={usersAPIData.offline}
            alerts={usersAPIData.alerts}
            type={type}
            usinsByState={usinsByState}
            handleChangeColumns={setType}
          />
          <BigNumbers
            reportsCounting={usersAPIData.reportsCounting}
            allDevices={usersAPIData.allDevices}
            notDefined={usersAPIData.notDefined}
            unactived={usersAPIData.unactived}
            offline={usersAPIData.offline}
            capacityTotal={usersAPIData.capacity}
            realGenerationTotal={realGenerationTotal}
            handleChangeColumns={setType}
            monthEconomyTotal={monthEconomyTotal}
            treesSavedTotal={treesSavedTotal}
          />
        </Grid>
        <Grid item xs={6} sx={{ height: 620 }}>
          <LocationUsins allDevices={usersAPIData.allDevices} />
        </Grid>

        {/*<MyDevices
          label={"Minhas Usinas"}
          isLoadingGraph={isLoadingGraph}
          realGeneration={realGeneration}
          estimatedGeneration={estimatedGeneration}
          realGenerationValueDataDevices={realGenerationValueDataDevices}
          estimatedGenerationValueDataDevices={
            estimatedGenerationValueDataDevices
          }
          percent={percent}
          type={type}
          handleChangeColumns={setType}
          dataDevices={dataDevices}
          allDevices={allDevices}
          brands={brands}
          capacityTotal={capacityTotal}
          notDefined={notDefined}
          unactived={unactived}
          online={online}
          offline={offline}
          alerts={alerts}
        />*/}
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Grid item xs={12}></Grid>
      </Grid>
      <Box
        sx={{
          width: "89vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          mb: 6,
        }}
      >
        <ListUsins
          data={data}
          devicesTableRef={devicesTableRef}
          type={type}
          usinsByState={usinsByState}
        />
        <PeriodDataUsins
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          optionFilter={optionFilter}
          setOptionFilter={setOptionFilter}
          adminGraphRef={adminGraphRef}
          realGenerationFiltered={realGenerationFiltered}
          estimatedGenerationFiltered={estimatedGenerationFiltered}
          percentGenerationFiltered={percentGenerationFiltered}
          isLoadingReportGeneration={isLoadingReportGeneration}
          useTypeMember={userData.useTypeMember}
          handleAdminReportGeneration={handleAdminReportGeneration}
        />
        <AlertDevices />
      </Box>
      {/*<TotalMonth
        optionFilter={optionFilter}
        setOptionFilter={setOptionFilter}
        useName={useName}
        type={type}
        realGenerationTotal={realGenerationTotal}
        estimatedGenerationTotal={estimatedGenerationTotal}
        percentTotal={percentTotal}
        dataDevices={dataDevices}
        allDevices={allDevices}
        data={data}
        isLoading={isLoading}
        setEstimatedGeneration={setEstimatedGeneration}
        setRealGeneration={setRealGeneration}
        setPercent={setPercent}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        devicesTableRef={devicesTableRef}
        adminGraphRef={adminGraphRef}
        setIsLoadingReportGeneration={setIsLoadingReportGeneration}
      />*/}
      <Modal
        open={open}
        onClose={handleAdminReportGeneration}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
            px: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              py: 4,
            }}
          >
            <Cancel
              fontSize="large"
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          {action == "assignPlan" ? (
            <MayaWatchPro />
          ) : (
            <PaymentWarn
              handleAdminReportGeneration={handleAdminReportGeneration}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
