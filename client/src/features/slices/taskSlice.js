import { createSlice } from "@reduxjs/toolkit";
import { 
  getDesignerCompletedTasks,
  getDesignerInProgressTasks,
  getDesignerPendingTasks,
  getLiveTasks,
  getTaskDetailsDesigner,
  getTaskDetailsAssocaite,
  updateTask,
  acceptTaskAssociate,
  getAssocaiteTasks,
  getAssociateTask,
  updateTaskProgress,
  deleteTaskProgress,
  completeTheTask,
  assignAssociateToTheTask,
} from "../actions/taskActions";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    currentTask: null,
    isUpdating: false,
    isCompletingTask: false,
    taskErrors: null,
    tasks: null,
    isLoading: false,
  },
  reducers: {
    setIsUpdatingTask: (state, action) => {
      state.isUpdating = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCompletingTask: (state, action) => {
      state.isCompletingTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDetailsDesigner.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(getTaskDetailsDesigner.rejected, (state, action) => {
      state.currentTask = null;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.currentTask = action.payload.data;
      // state.taskErrors = null;
      state.isUpdating = false;
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      // state.taskErrors = action.payload.errors;
      state.isUpdating = false;
    });


    builder.addCase(getDesignerPendingTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getDesignerPendingTasks.rejected, (state, action) => {
      state.tasks = null;
    });
    builder.addCase(getDesignerInProgressTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getDesignerInProgressTasks.rejected, (state, action) => {
      state.tasks = null;
    });
    builder.addCase(getDesignerCompletedTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getDesignerCompletedTasks.rejected, (state, action) => {
      state.tasks = null;
    });

    builder.addCase(getLiveTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getLiveTasks.rejected, (state, action) => {
      state.tasks = null;
    });

    builder.addCase(getTaskDetailsAssocaite.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(getTaskDetailsAssocaite.pending, (state, action) => {
      state.currentTask = null;
    });

    builder.addCase(acceptTaskAssociate.fulfilled, (state, action) => {
      state.currentTask = null;
    });

    builder.addCase(getAssocaiteTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getAssocaiteTasks.rejected, (state, action) => {
      state.tasks = null;
    });

    builder.addCase(getAssociateTask.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(getAssociateTask.rejected, (state, action) => {
      state.currentTask = null;
    });

    builder.addCase(updateTaskProgress.fulfilled, (state, action) => {
      state.currentTask.workUpdates.push(action.payload.data);
    });

    builder.addCase(deleteTaskProgress.fulfilled, (state, action) => {
      state.currentTask.workUpdates = state.currentTask.workUpdates.filter(
        (workUpdate) => workUpdate._id !== action.payload.data.deletedItemId
      );
    });
    builder.addCase(completeTheTask.fulfilled, (state, action) => {
      state.currentTask = null;
    });

    builder.addCase(assignAssociateToTheTask.fulfilled, (state, action) => {
      state.currentTask = null;
    });
  },
});

export default taskSlice.reducer;

export const { setIsUpdatingTask, setIsLoading, setIsCompletingTask } =
  taskSlice.actions;
