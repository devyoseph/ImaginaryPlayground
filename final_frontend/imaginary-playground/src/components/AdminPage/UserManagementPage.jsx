import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import UserInfoReadModal from "./UserInfoReadModal";
import swal from "sweetalert";

const columns = [
  { field: "id", headerName: "id", width: 50 },
  { field: "email", headerName: "이메일", width: 180 },
  { field: "name", headerName: "이름", width: 130 },
  {
    field: "hospital_name",
    headerName: "병원 이름",
    width: 250,
  },
  {
    field: "hospital_type",
    headerName: "병원 종류",
    width: 100,
  },
  {
    field: "address",
    headerName: "병원 주소",
    width: 600,
  },
  {
    field: "signup_path",
    headerName: "가입 경로",
    width: 100,
  },
];

const rows = [
  {
    id: 1,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
    signup_path: "kakao",
  },
  {
    id: 2,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
    signup_path: "naver",
  },
  {
    id: 3,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
    signup_path: "nomal",
  },
  {
    id: 4,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
  },
  {
    id: 5,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
  },
  {
    id: 6,
    email: "jimdac@naver.com",
    name: "유지홍",
    hospital_name: "순천향병원",
    hospital_type: "상급 병원",
    address: "인천광역시 부평구 동수로 56-(부평동)",
  },
];

const UserManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});

  const handleClickOpen = (e) => {
    setOpen(true);

    setSelectedUserInfo(e.row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyUserInfo = () => {
    if (!selectedUserInfo.name.length || selectedUserInfo.name.length > 15) {
      alert("이름은 1~15자 여야 합니다.");
      return;
    }
    //console.log(selectedUserInfo);
    setOpen(false);
  };

  const handleDeleteUserInfo = () => {
    //console.log(selectedUserInfo);
    swal({
      title: "회원 데이터 삭제 경고",
      text: `현재 삭제하려는 유저는 ${selectedUserInfo.email} 입니다.`,
      icon: "warning",
      buttons: true,
    }).then((Approval) => {
      if (Approval) {
        //비동기 통신(회원가입 승인)
        swal("삭제가 완료 되었습니다.", {
          icon: "success",
        });
        setOpen(false);
      }
    });
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div
      className="UserManagementPage"
      style={{ height: "88vh", width: "100%" }}
    >
      <DataGrid
        sx={{ cursor: "pointer" }}
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onCellClick={(e) => {
          handleClickOpen(e);
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        scroll="body"
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontFamily: "IBM Plex Sans KR",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "30px",
            marginTop: "10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>회원정보 수정</span>
          <span
            style={{
              fontSize: "15px",
              color: "rgb(117,117,117)",
              cursor: "pointer",
            }}
            onClick={handleDeleteUserInfo}
          >
            탈퇴하기
          </span>
        </DialogTitle>
        <DialogContent>
          <UserInfoReadModal
            userInfo={selectedUserInfo}
            setSelectedUserInfo={setSelectedUserInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span
              style={{ fontWeight: "bold", fontFamily: "IBM Plex Sans KR" }}
            >
              취소
            </span>
          </Button>
          <Button onClick={handleModifyUserInfo}>
            <span
              style={{ fontWeight: "bold", fontFamily: "IBM Plex Sans KR" }}
            >
              수정
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagementPage;
