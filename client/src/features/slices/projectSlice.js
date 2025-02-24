import { createSlice } from "@reduxjs/toolkit";
import {
  getDesignerCompletedProjects,
  getDesignerInProgressProjects,
  getDesignerInReviewProjects,
  getDesignerPendingProjects,
} from "../actions/designerActions";

import {
  addAfterProjectToPortfolio,
  addBeforeProjectToPortfolio,
  completeTheProject,
  deleteAfterProjectToPortifolio,
  deleteBeforeProjectToPortifolio,
  deletePedingProject,
  getProjectDetails,
  reviewProject,
  sentProjectToReview,
  updateProjectDetails,
  updateProjectProgress,
} from "../actions/projectActions";

import {
  getClientCompletedProjects,
  getClientInprogressProjects,
  getClientInReviewProjects,
  getClientPendingProjects,
} from "../actions/clientActions";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    currentProject: null,
    projects: null,
    isUpdating: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //get project
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      state.currentProject = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectDetails.rejected, (state, action) => {
      state.isLoading = false;
    });

    //deleting the project
    builder.addCase(deletePedingProject.fulfilled, (state, action) => {
      state.currentProject = null;
      state.isUpdating = false;
    });
    builder.addCase(deletePedingProject.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(deletePedingProject.rejected, (state, action) => {
      state.isUpdating = false;
    });

    builder.addCase(updateProjectDetails.fulfilled, (state, action) => {
      state.currentProject.address = action.payload.data.address;
      state.currentProject.description = action.payload.data.description;
      state.currentProject.title = action.payload.data.title;
      state.currentProject.minimumDays = action.payload.data.minimumDays;
      state.currentProject.budget = action.payload.data.budget;
      state.isUpdating = false;
    });
    builder.addCase(updateProjectDetails.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(updateProjectDetails.rejected, (state, action) => {
      state.isUpdating = false;
    });


    builder.addCase(completeTheProject.fulfilled, (state, action) => {
      state.currentProject.status = "completed";
      state.isUpdating = false;
    })
    builder.addCase(completeTheProject.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(completeTheProject.rejected, (state, action) => {
      state.isUpdating = false;
    })

 

    builder.addCase(updateProjectProgress.fulfilled, (state, action) => {
      state.currentProject.progress = action.payload.data.progress;
      state.currentProject.milestones = action.payload.data.milestones;
      state.isUpdating = false;
    })
    builder.addCase(updateProjectProgress.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(updateProjectProgress.rejected, (state, action) => {
      state.isUpdating = false;
    })

    builder.addCase(sentProjectToReview.fulfilled, (state, action) => {
       state.currentProject.status = 'reivew';
      state.isUpdating = false;
    })

    builder.addCase(addBeforeProjectToPortfolio.fulfilled, (state, action) => {
      state.currentProject.beforePictures.push(action.payload.data);
      state.isUpdating = false;
    })
    builder.addCase(addBeforeProjectToPortfolio.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(addBeforeProjectToPortfolio.rejected, (state, action) => {
      state.isUpdating = false;
    })

    builder.addCase(deleteBeforeProjectToPortifolio.fulfilled, (state, action) => {
      state.currentProject.beforePictures = state.currentProject.beforePictures.filter(
        (picture) => picture._id !== action.payload.data._id
      );
      state.isUpdating = false;
    })
    builder.addCase(deleteBeforeProjectToPortifolio.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(deleteBeforeProjectToPortifolio.rejected, (state, action) => {
      state.isUpdating = false;
    })

    builder.addCase(addAfterProjectToPortfolio.fulfilled, (state, action) => {
      state.currentProject.afterPictures.push(action.payload.data);
      state.isUpdating = false;
    })
    builder.addCase(addAfterProjectToPortfolio.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(addAfterProjectToPortfolio.rejected, (state, action) => {
      state.isUpdating = false;
    })

    builder.addCase(deleteAfterProjectToPortifolio.fulfilled, (state, action) => {
      state.currentProject.afterPictures = state.currentProject.afterPictures.filter(
        (picture) => picture._id !== action.payload.data._id
      );
      state.isUpdating = false;
    })
    builder.addCase(deleteAfterProjectToPortifolio.pending, (state, action) => {
      state.isUpdating = true;
    })
    builder.addCase(deleteAfterProjectToPortifolio.rejected, (state, action) => {
      state.isUpdating = false;
    })


 

    //get designer pending projects
    builder.addCase(getDesignerPendingProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDesignerPendingProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDesignerPendingProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    //get designer inprogress projects
    builder.addCase(
      getDesignerInProgressProjects.fulfilled,
      (state, action) => {
        state.projects = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getDesignerInProgressProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDesignerInProgressProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    //get designer inreview projects
    builder.addCase(getDesignerInReviewProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDesignerInReviewProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDesignerInReviewProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    //get designer completed projects
    builder.addCase(getDesignerCompletedProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDesignerCompletedProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDesignerCompletedProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    //client pending projects
    builder.addCase(getClientPendingProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClientPendingProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientPendingProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    //client inprgress projects
    builder.addCase(getClientInprogressProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClientInprogressProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientInprogressProjects.rejected, (state, action) => {
      state.isLoading = false;
    });
    //client in review projects
    builder.addCase(getClientInReviewProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClientInReviewProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientInReviewProjects.rejected, (state, action) => {
      state.isLoading = false;
    });
    //client completed projects
    builder.addCase(getClientCompletedProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClientCompletedProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientCompletedProjects.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default projectSlice.reducer;
