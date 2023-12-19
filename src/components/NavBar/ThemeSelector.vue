<template>
    <div class="container-fluid">
        <div class="dropdown px-4">
            <a class="px-5 text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i :class="`h5 bi bi-${currentThemeIcon}`"></i>
            <i class="h5 bi bi-arrow-down-short"></i>
            </a>
            <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Theme Selector</h6></li>
                <li><hr class="dropdown-divider"></li>
                <li class="dropdown-item showCursorOnMouseOver text-center" @click.prevent="setThemeDark"><i class="bi bi-moon"></i> Dark Mode</li>
                <li class="dropdown-item showCursorOnMouseOver text-center" @click.prevent="setThemeLight"><i class="bi bi-sun"></i> Light Mode</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        let theme = localStorage.getItem('theme');

        if(theme === 'dark') {
            this.setThemeDark();
        }else {
            this.setThemeLight();
        }

    },
    data() {
        return {
            currentThemeIcon: 'sun',
        }
    },
    methods: {
        setThemeDark() {
            this.currentThemeIcon = 'moon';
            const htmlTag = document.querySelector('html');
            htmlTag.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        },
        setThemeLight() {
            this.currentThemeIcon = 'sun';
            const htmlTag = document.querySelector('html');
            htmlTag.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        },
    }
}

</script>

<style scoped>
.showCursorOnMouseOver {
  cursor: pointer;
}
</style>
