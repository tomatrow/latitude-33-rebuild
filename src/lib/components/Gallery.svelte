<script lang="ts">
    import { openModal } from "./ModalProvider.svelte"
    import GalleryModal from "./GalleryModal.svelte"

    export let images = []
</script>

<slot {...$$restProps} show={index => openModal(GalleryModal, { images, index })} />
