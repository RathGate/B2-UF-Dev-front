import {getCurrentUser} from "~/composables/api_user.composable.js";

export default defineNuxtRouteMiddleware(async (to, from) =>  {
    const token = useCookie("token");
    if(!token.value) return navigateTo("/login");
    const runtimeConfig = useRuntimeConfig();
    const userLoggedIn = await getCurrentUser(runtimeConfig.public.API_ENDPOINT, token.value);
    if (userLoggedIn.error) {
        return navigateTo("/login");
    }
})