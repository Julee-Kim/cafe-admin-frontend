<template>
	<b-modal :id="id" modal-class="modal_delete" hide-header hide-footer>
		<div class="modal_delete_inner">
			<div class="modal_header">
				<trash-2-icon size="80" class="ico_trash"></trash-2-icon>
				<slot name="header" class="header_title" v-if="$slots.header"></slot>
				<div class="header_title" v-else>삭제 확인</div>
			</div>

			<div class="modal_content">
				<slot name="content" v-if="$slots.content"></slot>
			</div>

			<div class="modal_footer">
				<b-button class="btn btn_no" @click="answer(false)"><x-icon size="18"></x-icon><span class="txt">No</span></b-button>
				<b-button class="btn btn_yes" @click="answer(true)"><check-icon size="18"></check-icon><span class="txt">Yes</span></b-button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import {
  XIcon,
	CheckIcon,
	Trash2Icon
} from 'vue-feather-icons'

export default {
	name: 'ModalDelete',
	created () {},
	mounted () {},
	destroyed () {
		// $(`#${this._id}`).remove()
	},
	components: {
		XIcon,
		CheckIcon,
		Trash2Icon
	},
	props: {
		id: {
			type: String,
			required: true,
			default: () => 'modalDelete'
		}
	},
	data () {
		return {
		}
	},
	computed: {},
	watch: {},
	methods: {
		answer (answer) {
			this.$emit('answer', answer)
		}
	}
}
</script>

<style lang="scss">
.modal_delete {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.85);

	.modal-dialog {
		margin: 0;
		max-width: 100%;
		height: 100%;

		& > div {
			height: 100%;
			background-color: transparent;
		}
	}

	.modal_delete_inner {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		max-width: 720px;
		color: #fff;
	}

		.modal_header {
			padding: 30px;
			font-size: 18px;
			font-weight: 700;
			text-align: center;

			.header_title { margin-top: -10px; }
			.ico_trash {
				margin-bottom: 1.5rem;
			}
		}

		.modal_content {
			padding: 20px 20px 50px;
		}

		.modal_footer {
			padding: 14px;
			text-align: right;

			.btn {
				margin-left: 15px;
				padding: 3px;
				width: 83px;
				height: 36px;
				font-size: 14px;
				background-color: transparent;
				border: 2px solid;
				border-radius: 3px;

				&.btn_no {
					border-color: #adadad;
					color: #adadad;

					.txt { color: #fff; }

					&:hover {
						color: #fff;
						background-color: #adadad !important;
					}
				}

				&.btn_yes {
					border-color: #2ecc40;
					color: #2ecc40;

					&:hover {
						color: #fff;
						background-color: #2ecc40 !important;
					}
				}

				span {
					vertical-align: middle;

					&.material-icon { font-weight: 700; }
					&.txt { margin-left: 3px; }
				}
			}
		}
}
</style>
