import 'reflect-metadata';
import App from "@/app";
import validateEnv from "@services/utils/validateEnv";
import UserRoute from "@routes/user.route";
import IndexRoute from "@routes/index.route";
import AuthRoute from "@routes/auth.route";
import ArticleRoute from "@routes/article.route";
import PageViewRoute from "@routes/pageView.route";


validateEnv();

const app = new App([
    new IndexRoute(), new AuthRoute(), new UserRoute(), new ArticleRoute(), new PageViewRoute()
]);

app.listen();