<template>
    <div class="join">
        <h1>Join our Team of Writers</h1>
        <p>On dasdas, writers earn a living doing what they love</p>
        <p>Getting started is easy. Just pay a one time 
            <strong>$25 fee</strong> and everything is ready to go.
        </p>
        <Button
            @click="makePayment"
        >
            join us
        </Button>
    </div>

</template>

<script>
import Button from "@/components/base/Button.vue"

export default {
    name: "JoinUs",

    components: {
        Button
    },

    created() {
        var scripts = [
            "https://checkout.flutterwave.com/v3.js",
        ];
        scripts.forEach(script => {
            let tag = document.createElement("script");
            tag.setAttribute("src", script);
            document.head.appendChild(tag);
        });
    },

    methods: {
        makePayment() {
            window.FlutterwaveCheckout({
                public_key: "FLWPUBK_TEST-cfb8cac86367002303b8d0828757f024-X",
                tx_ref: "RX1",
                amount: 25,
                currency: "USD",
                country: "US",
                payment_options: "card",
                customer: {
                    email: "cornelius@gmail.com",
                    phone_number: "08102909304",
                    name: "Flutterwave Developers",
                },
                callback: function (data) { // specified callback function
                    console.log(data);
                },
                customizations: {
                    title: "Dasdas Subscription",
                    description: "Payment for membership",
                    logo: "https://assets.piedpiper.com/logo.png",
                },
            });
        }
    }

}
</script>

<style lang="scss" scoped>
    .join {
        text-align: center;
    }
</style>

