import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDesignerCompletedTasks, getDesignerInProgressTasks, getDesignerPendingTasks, getLiveTasks, getTaskDetailsDesigner, getTaskDetailsAssocaite, updateTask, acceptTaskAssociate, getAssocaiteTasks, getAssociateTask } from "../actions/taskActions";


const taskSlice = createSlice({
    name: "task",
    initialState: {
        currentTask: null,
        isUpdating: false,
        taskErrors: null,
        tasks: null,
        isLoading: false,
    },
    reducers: {
        setIsUpdatingTask: (state, action) => {
            state.isUpdating = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTaskDetailsDesigner.fulfilled, (state, action) => {
            state.tasks = action.payload.tasks;
            state.isLoading = false;
        });
        builder.addCase(getTaskDetailsDesigner.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTaskDetailsDesigner.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.tasks = action.payload.tasks;
            state.taskErrors = null;
            state.isUpdating = false;
        });
        builder.addCase(updateTask.pending, (state, action) => {
            state.isUpdating = true;
        });
        builder.addCase(updateTask.rejected, (state, action) => {
            state.taskErrors = action.payload.errors;
            state.isUpdating = false;
        })

        builder.addCase(getDesignerPendingTasks.fulfilled, (state, action)=>{
            state.tasks = action.payload;
        })
        builder.addCase(getDesignerPendingTasks.rejected, (state, action)=>{
            state.tasks = null;
        })
        builder.addCase(getDesignerInProgressTasks.fulfilled, (state, action)=>{
            state.tasks = action.payload;
        })
        builder.addCase(getDesignerInProgressTasks.rejected, (state, action)=>{
            state.tasks = null;
        })
        builder.addCase(getDesignerCompletedTasks.fulfilled, (state, action)=>{
            state.tasks = action.payload;
        })
        builder.addCase(getDesignerCompletedTasks.rejected, (state, action)=>{
            state.tasks = null;
        })

        builder.addCase(getLiveTasks.fulfilled, (state, action)=>{
            state.tasks = action.payload;
        })
        builder.addCase(getLiveTasks.rejected, (state, action)=>{
            state.tasks = null;
        })

        builder.addCase(getTaskDetailsAssocaite.fulfilled, (state, action)=>{
            state.currentTask = action.payload;
        })
        builder.addCase(getTaskDetailsAssocaite.pending, (state, action)=>{
            state.currentTask = null
        })

        builder.addCase(acceptTaskAssociate.fulfilled, (state, action)=>{
            state.currentTask = null;
        })

        builder.addCase(getAssocaiteTasks.fulfilled, (state, action)=>{
            state.tasks = action.payload;
        })
        builder.addCase(getAssocaiteTasks.rejected, (state, action)=>{
            state.tasks = null;
        })

        builder.addCase(getAssociateTask.fulfilled, (state, action)=>{
            state.currentTask = action.payload;
        })  
        builder.addCase(getAssociateTask.rejected, (state, action)=>{
            state.currentTask = null;
        })
     
    }
});


export default taskSlice.reducer;

export const { setIsUpdatingTask , setIsLoading } = taskSlice.actions