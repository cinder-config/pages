<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand style="font-variant-caps: small-caps;" href="#">CInder</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="demo">Demo</b-nav-item>
                <b-nav-item to="dataset">Dataset</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">GitHub</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<style scoped lang="scss">
    .bg-dark {
        background-color: #34495e !important;
    }
</style>
