import { inngest } from "../inngest/index.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

const LEAVE_STATUSES = [
  "APPROVED",
  "REJECTED",
  "PENDING",
];

// Create leave
// POST /api/leaves
export const createLeave = async (req, res) => {
  try {
    const { userId } = req.session;

    const employee = await Employee.findOne({
      userId,
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error:
          "Your account is deactivated. You cannot apply for leave.",
      });
    }

    const {
      type,
      startDate,
      endDate,
      reason,
    } = req.body;

    if (!type || !startDate || !endDate || !reason) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start <= today || end <= today) {
      return res.status(400).json({
        error: "Leave dates must be in the future",
      });
    }

    if (end < start) {
      return res.status(400).json({
        error: "End date cannot be before start date",
      });
    }

    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      startDate: start,
      endDate: end,
      reason,
      status: "PENDING",
    });

    await inngest.send({
      name: "leave/pending",
      data: {
        LeaveApplicationId: leave._id,
      },
    });

    return res.json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.error("Create Leave Error:", error);

    return res.status(500).json({
      error: "Failed",
    });
  }
};

// Get leaves
// GET /api/leaves
export const getLeaves = async (req, res) => {
  try {
    const { userId, role } = req.session;
    const isAdmin = role === "ADMIN";

    if (isAdmin) {
      const { status } = req.query;

      const where = status
        ? { status }
        : {};

      const leaves = await LeaveApplication.find(where)
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const data = leaves.map((leave) => {
        const obj = leave.toObject();

        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId:
            obj.employeeId?._id?.toString(),
        };
      });

      return res.json({
        data,
      });
    }

    const employee = await Employee.findOne({
      userId,
    }).lean();

    if (!employee) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    const leaves = await LeaveApplication.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    return res.json({
      data: leaves,
      employee: {
        ...employee,
        id: employee._id.toString(),
      },
    });
  } catch (error) {
    console.error("Get Leaves Error:", error);

    return res.status(500).json({
      error: "Failed",
    });
  }
};

// Update leave status
// PATCH /api/leaves/:id
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!LEAVE_STATUSES.includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const leave =
      await LeaveApplication.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          returnDocument: "after",
        }
      );

    return res.json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.error(
      "Update Leave Status Error:",
      error
    );

    return res.status(500).json({
      error: "Failed",
    });
  }
};