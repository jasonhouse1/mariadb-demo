<template>
  <div class="container">
    <el-date-picker
      v-model="sele0tedDate"
      type="date"
      placeholder="選擇日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      @change="fetchReservations"
    />

    <el-table :data="reservations" border class="table">
      <el-table-column prop="reservation_id" label="預約編號" />
      <el-table-column prop="student_id" label="學生編號" />
      <el-table-column prop="seat_id" label="座位編號" />
      <el-table-column prop="timeslot_id" label="時段編號" />
      <el-table-column prop="reservation_date" label="預約日期" />
      <el-table-column prop="create_time" label="創建時間" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Reservation } from "./interfaces/Reservations";
import { asyncGet } from "./utils/fetch";
import { apis } from "./enum/api";

const reservations = ref<Array<Reservation>>([]);
const selectedDate = ref<string>(""); // 選擇的日期

// 獲取預約數據
const fetchReservations = () => {
  const url = selectedDate.value ? `${apis.reservations}?date=${selectedDate.value}` : apis.reservations;
  
  asyncGet(url)
    .then((resp: Array<Reservation>) => {
      reservations.value = resp;
    })
    .catch((error) => {
      console.error("獲取數據失敗:", error);
    });
};

// 初始化時獲取數據
onMounted(fetchReservations);
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .table {
    width: 80%;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  :deep(.el-table__header) {
    background-color: #fafafa;
    font-weight: bold;
  }

  :deep(.el-table__row) {
    &:hover {
      background-color: #f0f7ff;
    }
  }
}
</style>
