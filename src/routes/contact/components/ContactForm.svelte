<script>
	/** @type {import('./$types').ActionData} */
	export let form
	import ExternalLink from '$lib/components/external-link/ExternalLink.svelte'
	import { enhance } from '$app/forms';

	
/* 10101222198456304
10104457521842304,
	console.dir(form)
	129147376954968 */

</script>




<section class="p-12">
	<div class="">
		<div class="row justify-center">
			<div class="col-md-6 text-center mb-12">
				<!-- <h2>Send Us A Message</h2> -->
			</div>
		</div>
		<div class="row justify-center">
			<div>
				<div class="wrapper">
				
					

			
					<div class="row no-gutters">
						<div class="col-md-6 flex">
							<div class="contact-wrap md:p-12 p-6">
								<h3 class="mb-6 text-2xl">Connect With Us</h3>
								<div id="form-message-warning" class="mb-4"></div>
								<div id="form-message-success" class="mb-6">Your message was sent, thank you!</div>
								<form method="POST" id="contactForm" name="contactForm" class="contactForm" action="?/mail" use:enhance>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<input
													type="text"
													class="form-control"
													name="name"
													id="name"
													placeholder="Name"
													required
												/>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<input
													type="email"
													class="form-control"
													name="email"
													id="email"
													placeholder="Email"
												/>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<input
													type="tel"
													class="form-control"
													name="phone"
													id="phone"
													placeholder="Phone Number"
													required
												/>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<input
													type="text"
													class="form-control"
													name="subject"
													id="subject"
													placeholder="Subject"
												/>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<textarea
													name="message"
													class="form-control"
													id="message"
													cols="30"
													rows="6"
													placeholder="Message"
												></textarea>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<input type="submit" value="Send" class="btn btn-primary" />
												<div class="submitting"></div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="col-md-6 flex">
							<div class="info-wrap w-full md:p-12 px-6 py-12 img">
								<h3>Contact information</h3>
								<p class="mb-6 text-white">We're open for any suggestion or just to have a chat</p>
								<div class="dbox flex items-center">
									<div class="icon flex items-center justify-center">
										<span class="fa fa-map-marker"></span>
									</div>
									<div class="text pl-6">
										<p class="text-white"><span>Address:</span> <ExternalLink href={'https://maps.app.goo.gl/QMGwSKnXsruNTVo77'} aria-label={'Google Maps Location'} cssClasses={'text-accent-color'}> 125 Gateway Dr, Mechanicsburg, PA 17050</ExternalLink></p>
									</div>
								</div>
								<div class="dbox flex items-center">
									<div class="icon flex items-center justify-center">
										<span class="fa fa-phone"></span>
									</div>
									<div class="text pl-6 font-display">
										<p><span>Phone:</span> <a class="font-display" href="tel:7177372324">Tel: (717) 737-2324</a></p>
									</div>
								</div>
								<div class="dbox flex items-center">
									<div class="icon flex items-center justify-center">
										<span class="fa fa-paper-plane"></span>
									</div>
									<div class="text pl-6">
										<p>
											<span>Email:</span> <a href="mailto:tremaineg@pntmail.com">tremaineg@pntmail.com</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
</section>


<style>
	p {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	a {
		color: #007bff;
		text-decoration: none;
		background-color: transparent;
	}
	a:hover {
		color: #0056b3;
		text-decoration: underline;
	}

	a:not([href]):not([tabindex]) {
		color: inherit;
		text-decoration: none;
	}
	a:not([href]):not([tabindex]):hover,
	a:not([href]):not([tabindex]):focus {
		color: inherit;
		text-decoration: none;
	}
	a:not([href]):not([tabindex]):focus {
		outline: 0;
	}

	.btn {
		display: inline-block;
		font-weight: 400;
		color: #212529;
		text-align: center;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-color: transparent;
		border: 1px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		-webkit-transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
		-o-transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
	}
	@media (prefers-reduced-motion: reduce) {
		.btn {
			-webkit-transition: none;
			-o-transition: none;
			transition: none;
		}
	}
	.btn:hover {
		color: #212529;
		text-decoration: none;
	}
	.btn:focus,
	.btn.focus {
		outline: 0;
		-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
	.btn.disabled,
	.btn:disabled {
		opacity: 0.65;
	}

	.btn-primary {
		color: #fff;
		background-color: var(--playntrade-dark-blue);
		border-color: var(--playntrade-dark-blue);
	}
	.btn-primary:hover {
		color: #fff;
		background-color: var(--playntrade-blue);
		border-color: var(--playntrade-blue);
	}
	.btn-primary:focus,
	.btn-primary.focus {
		-webkit-box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
		box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
	}
	.btn-primary.disabled,
	.btn-primary:disabled {
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
	}
	.btn-primary:not(:disabled):not(.disabled):active,
	.btn-primary:not(:disabled):not(.disabled).active,
	.show > .btn-primary.dropdown-toggle {
		color: #fff;
		background-color: #0062cc;
		border-color: #005cbf;
	}
	.btn-primary:not(:disabled):not(.disabled):active:focus,
	.btn-primary:not(:disabled):not(.disabled).active:focus,
	.show > .btn-primary.dropdown-toggle:focus {
		-webkit-box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
		box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
	}

	input {
		overflow: visible;
	}

	[type='submit'] {
		-webkit-appearance: button;
	}

	textarea {
		overflow: auto;
		resize: vertical;
	}

	[type='number']::-webkit-inner-spin-button,
	[type='number']::-webkit-outer-spin-button {
		height: auto;
	}

	.row {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	.no-gutters {
		margin-right: 0;
		margin-left: 0;
	}

	.no-gutters > [class*='col-'] {
		padding-right: 0;
		padding-left: 0;
	}

	@media (min-width: 768px) {
		.col-md-6 {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 50%;
			flex: 0 0 50%;
			max-width: 50%;
		}

		.col-md-12 {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 100%;
			flex: 0 0 100%;
			max-width: 100%;
		}
	}

	.form-control {
		display: block;
		width: 100%;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		-webkit-transition:
			border-color 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
		transition:
			border-color 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
		-o-transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out,
			-webkit-box-shadow 0.15s ease-in-out;
	}
	@media (prefers-reduced-motion: reduce) {
		.form-control {
			-webkit-transition: none;
			-o-transition: none;
			transition: none;
		}
	}
	.form-control::-ms-expand {
		background-color: transparent;
		border: 0;
	}
	.form-control:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
	.form-control::-webkit-input-placeholder {
		color: #6c757d;
		opacity: 1;
	}
	.form-control:-ms-input-placeholder {
		color: #6c757d;
		opacity: 1;
	}
	.form-control::-ms-input-placeholder {
		color: #6c757d;
		opacity: 1;
	}
	.form-control::placeholder {
		color: #6c757d;
		opacity: 1;
	}
	.form-control:disabled {
		background-color: #e9ecef;
		opacity: 1;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	a {
		-webkit-transition: 0.3s all ease;
		-o-transition: 0.3s all ease;
		transition: 0.3s all ease;
		color: #f39422;
	}
	a:hover,
	a:focus {
	
		outline: none !important;
		-webkit-box-shadow: none;
		box-shadow: none;
	}

	.form-control {
		height: 52px;
		background: transparent;
		color: rgba(255, 255, 255, 0.8) !important;
		font-size: 14px;
		border-radius: 0px;
		-webkit-box-shadow: none !important;
		box-shadow: none !important;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.form-control::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		color: rgba(255, 255, 255, 0.5) !important;
	}
	.form-control::-moz-placeholder {
		/* Firefox 19+ */
		color: rgba(255, 255, 255, 0.5) !important;
	}
	.form-control:-ms-input-placeholder {
		/* IE 0+ */
		color: rgba(255, 255, 255, 0.5) !important;
	}
	.form-control:-moz-placeholder {
		/* Firefox 18- */
		color: rgba(255, 255, 255, 0.5) !important;
	}
	.form-control:focus,
	.form-control:active {
		background: transparent;
		border-color: rgba(255, 255, 255, 0.5) !important;
	}

	textarea.form-control {
		height: inherit !important;
	}

	.wrapper {
		width: 100%;
		overflow: hidden;
		border-radius: 10px;
		-webkit-box-shadow: 0px 21px 41px -13px rgba(0, 0, 0, 0.18);
		-moz-box-shadow: 0px 21px 41px -13px rgba(0, 0, 0, 0.18);
		box-shadow: 0px 21px 41px -13px rgba(0, 0, 0, 0.18);
	}

	.contact-wrap {
		background: #272a34;
	}
	.contact-wrap h3 {
		color: #fff;
	}

	.info-wrap {
		background: #1c1e25;
	}
	.info-wrap h3 {
		color: white;
		font-size: 18px;
		position: relative;
	}
	.info-wrap .dbox {
		width: 100%;
		margin-bottom: 25px;
	}
	.info-wrap .dbox:last-child {
		margin-bottom: 0;
	}
	.info-wrap .dbox p {
		margin-bottom: 0;
	}
	.info-wrap .dbox p span {
		font-weight: 700;
		color: #fff;
	}
	.info-wrap .dbox p a {
		color: var(--playntrade-turquoise);
	}
	.info-wrap .dbox p a:hover,  .info-wrap .dbox p a:focus{
		text-decoration: underline;
	}
	.info-wrap .dbox .icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.02);
	}
	.info-wrap .dbox .icon span {
		font-size: 20px;
		color: var(--playntrade-turquoise);
	}
	.info-wrap .dbox .text {
		width: calc(100% - 50px);
	}

	.contactForm .form-control {
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0;
	}

	#contactForm .form-control {
		font-size: 16px;
	}

	#form-message-warning,
	#form-message-success {
		display: none;
	}

	#form-message-warning {
		color: red;
	}

	#form-message-success {
		color: #28a745;
		font-size: 18px;
		font-weight: 500;
	}

	.submitting {
		float: left;
		width: 100%;
		padding: 10px 0;
		display: none;
		font-size: 16px;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.col-md-12 {
			width: 100%;
			padding: 0 15px;
		}

		.col-md-12 {
			width: 100%;
		}
	}
</style>
