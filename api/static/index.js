function Form(props) {
    return {
        $template: "#form",
        isLoading: false,
        vehicleidError: "",
        durationError: "",
        generalError: "",
        success: false,
        vehicleid: "",
        durationMinutes: 0,
        durationHours: 0,
        durationDays: 0,
        cardName: "",
        expiration: "",
        cardNumber: "",
        cvv: "",
        paymentType: "credit",
        total: 0,
        handleDaysChange(e) {
            console.log("aqui");
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"

                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });
            this.durationDays = parseInt(e.target.value);
            this.total = formatter.format(
                this.computeDurationInMinutes(
                    this.durationMinutes,
                    this.durationHours,
                    parseInt(e.target.value)
                ) / 10
            );
            console.log(this.total);
        },
        handleHoursChange(e) {
            console.log("aqui");
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"

                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });
            this.durationHours = parseInt(e.target.value);
            this.total = formatter.format(
                this.computeDurationInMinutes(
                    this.durationMinutes,
                    parseInt(e.target.value),
                    this.durationDays
                ) / 10
            );
            console.log(this.total);
        },
        handleMinutesChange(e) {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"

                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });
            console.log(e.target.value);
            this.durationMinutes = parseInt(e.target.value);
            this.total = formatter.format(
                this.computeDurationInMinutes(
                    parseInt(e.target.value),
                    this.durationHours,
                    this.durationDays
                ) / 10
            );
            console.log(this.total);
        },
        submit(e) {
            e.preventDefault();

            this.isLoading = true;
            this.vehicleidError = "";
            this.durationError = "";
            this.generalError = "";
            this.total = 17;

            if (
                !/^\d\d\/\d\d$/.test(this.expiration) ||
                parseInt(this.expiration.slice(0, 2)) > 12
            ) {
                this.generalError = "Expiration of card must be MM/YY";
                this.isLoading = false;
                return;
            }

            let duration = this.computeDurationInMinutes();

            fetch("/rent", {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vehicleid: this.vehicleid,
                    duration: duration,
                    payment_type: this.paymentType,
                    name: this.cardName,
                    card_number: this.cardNumber,
                    expiration: this.expiration,
                    cvv: this.cvv
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data");
                    this.isLoading = false;
                })
                .catch((err) => {
                    this.generalError = err.message;
                    this.isLoading = false;
                });
        },

        computeDurationInMinutes(minutes, hours, days) {
            return minutes + hours * 60 + days * 24 * 60;
        }
    };
}
PetiteVue.createApp({
    Form,
    $delimiters: ["[[", "]]"]
}).mount();
