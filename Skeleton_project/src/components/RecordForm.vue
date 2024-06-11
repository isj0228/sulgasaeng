<template>
    <div class="p-5">
        <div class="text-center">
            <h1 class="h4 text-gray-900 mb-4">빠른 등록</h1>
        </div>
        <form>
            <div class="form-group">
                <input type="date" class="form-control form-control-user" id="exampleInputdate"
                    aria-describedby="dateHelp" placeholder="Enter date Address...">
                <!-- <input type="date" class="form-control form-control-user" placeholder="Date" required /> -->
            </div>
            <div class="form-group">
                <input type="password" class="form-control form-control-user" id="exampleInputPassword"
                    placeholder="Password">
            </div>
            <div class="form-group">
                <div class="custom-control custom-checkbox small">
                    <input type="checkbox" class="custom-control-input" id="customCheck">
                    <label class="custom-control-label" for="customCheck">Remember
                        Me</label>
                </div>
            </div>
            <a href="index.html" class="btn btn-primary btn-user btn-block">
                Login
            </a>
            <hr>
            <a href="index.html" class="btn btn-google btn-user btn-block">
                <i class="fab fa-google fa-fw"></i> Login with Google
            </a>
            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
            </a>
        </form>
        <!-- <hr>
                <div class="text-center">
                  <a class="small" href="forgot-password.html">Forgot Password?</a>
                </div>
                <div class="text-center">
                  <a class="small" href="register.html">Create an Account!</a>
                </div> -->
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>