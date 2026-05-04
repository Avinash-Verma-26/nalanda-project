import { Router } from "express";
import {
  searchByAuthor,
  searchByTitle,
} from "../controllers/bookSearchController";

const bookSearchRouter = Router();

bookSearchRouter.get("/byAuthor", searchByAuthor);
bookSearchRouter.get("/byTitle", searchByTitle);

export default bookSearchRouter;
