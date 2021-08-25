<script lang="ts">
    import { openModal } from "./ModalProvider.svelte"
    import GalleryModal from "./GalleryModal.svelte"

    export let images = []
    export const show = index => openModal(GalleryModal, { images, index })
</script>

<slot {...$$restProps} {show} />
