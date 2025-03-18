import mongoose from "mongoose";

const requestReviewValidations = ({
  senderId,
  status,
  documentId,
  loggedInUserId,
}) => {
  try {
    if (!senderId || !status || !documentId)
      throw new Error("SenderId, status and document all fields are required");

    const isvalidMongoSenderId = mongoose.Types.ObjectId.isValid(senderId);
    const isValidMongoDocumentId = mongoose.Types.ObjectId.isValid(documentId);
    if (!isvalidMongoSenderId || !isValidMongoDocumentId)
      throw new Error("Invalid sender or document id");

    if (senderId.toString() !== loggedInUserId.toString())
      throw new Error("ID did not match");

    if (status !== "accept" && status !== "reject")
      throw new Error(
        `Invalid status ${status}, status can only be accepted or rejected`
      );

    return true;
  } catch (error) {
    return { error: error.message };
  }
};

export { requestReviewValidations };
