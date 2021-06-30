<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"

    // This values depends on .vsm-background styles (width/height)
    const BASE_WIDTH = 380
    const BASE_HEIGHT = 400

    const dispatch = createEventDispatcher()

    export let menu = []
    export let screenOffset = 10
    export let dropdownOffset = 0
    export let handler: "hover" | "click" = "hover"
    /**
     * Must be equals as $vsm-transition (scss variable)
     * @default .25s
     */
    export let transitionTimeout = 250
    let clazz = ""
    export { clazz as class }

    let element: HTMLHeaderElement
    let root
    let linkContainer
    let dropdownContainer
    let arrow
    let background
    let backgroundAlt
    let elementsWithDropdown = []
    let dropdownContainerItems = []

    let _activeDropdown
    let _activeContainerItem
    let _closeDropdownTimeout
    let _enableTransitionTimeout
    let _disableTransitionTimeout
    let _isDragging
    let _vsmMenu
    let _vsmMenuHandlers
    let _lastWindowWidth

    $: itemsWithDropdown = menu.filter(item => item.dropdown)

    function createLinkAttributes(
        item: { dropdown: any; attributes?: Record<string, string> },
        index: number
    ) {
        return {
            classes:
                `vsm-link ` +
                (item.dropdown ? "vsm-has-dropdown " : " ") +
                (item?.attributes?.class ?? ""),
            attributes: {
                "data-dropdown": item.dropdown,
                "aria-haspopup": !!item.dropdown,
                "aria-expanded": !item.dropdown,
                tabindex: "0"
            }
        }
    }

    onMount(() => {
        const removeGlobalListeners = registerGlobalListeners()
        updateDataElements()
        registerDropdownElementsEvents()
        registerDropdownContainerEvents()
        return removeGlobalListeners
    })

    function registerGlobalListeners() {
        const onMove = () => (_isDragging = true)
        const onStart = () => (_isDragging = false)
        document.addEventListener("touchmove", onMove)
        document.addEventListener("touchstart", onStart)
        return () => {
            document.removeEventListener("touchmove", onMove)
            document.removeEventListener("touchstart", onStart)
        }
    }

    function toggleDropdown(el) {
        _activeDropdown ? closeDropdown() : openDropdown(el)
    }

    function openDropdown(el) {
        if (_activeDropdown === el) return

        dispatch("open-dropdown", el)

        element.classList.add("vsm-overlay-active", "vsm-dropdown-active")
        _activeDropdown = el
        _activeDropdown.setAttribute("aria-expanded", "true")
        elementsWithDropdown.forEach(el => el.classList.remove("vsm-active"))
        el.classList.add("vsm-active")

        const activeDataDropdown = el.getAttribute("data-dropdown")
        let direction = "vsm-left"

        dropdownContainerItems.forEach(item => {
            item.el.classList.remove("vsm-active", "vsm-left", "vsm-right")

            if (item.name === activeDataDropdown) {
                item.el.setAttribute("aria-hidden", "false")
                item.el.classList.add("vsm-active")
                direction = "vsm-right"
                _activeContainerItem = item
            } else {
                item.el.setAttribute("aria-hidden", "true")
                item.el.classList.add(direction)
            }
        })

        resizeDropdown()
    }

    function closeDropdown() {
        if (!_activeDropdown) return

        dispatch("close-dropdown", _activeDropdown)
        elementsWithDropdown.forEach(el => el.classList.remove("vsm-active"))

        _activeContainerItem.el.setAttribute("aria-hidden", "true")

        clearEnableTransitionTimeout()
        startDisableTransitionTimeout()

        element.classList.remove("vsm-overlay-active", "vsm-dropdown-active")

        _activeDropdown.setAttribute("aria-expanded", "false")
        _activeContainerItem = undefined
        _activeDropdown = undefined
    }

    function resizeDropdown() {
        if (!_activeContainerItem) return

        const bodyWidth = document.documentElement.offsetWidth
        const rootRect = element.getBoundingClientRect()
        const rect = _activeDropdown.getBoundingClientRect()

        let { offsetHeight, offsetWidth } = _activeContainerItem.content

        // Find the beginning of a menu item
        const leftPosition = rect.left - rootRect.left

        // Step back from the button to the left so that the middle of
        // the content is found in the center of the element
        let centerPosition = leftPosition - offsetWidth / 2 + rect.width / 2

        // Do not let go of the left side of the screen
        if (centerPosition + rootRect.left < +screenOffset)
            centerPosition = +screenOffset - rootRect.left

        // Now also check the right side of the screen
        const rightOffset = centerPosition + rootRect.left + offsetWidth
        if (rightOffset > bodyWidth - +screenOffset) {
            centerPosition -= rightOffset - bodyWidth + +screenOffset

            // Recheck the left side of the screen
            if (centerPosition < +screenOffset - rootRect.left) {
                // Just set the menu to the full width of the screen
                centerPosition = +screenOffset - rootRect.left
                offsetWidth = bodyWidth - +screenOffset * 2
            }
        }

        // Possible blurring font with decimal values
        centerPosition = Math.round(centerPosition)

        const totalDropdownOffset = +dropdownOffset + _activeDropdown.offsetTop
        const ratioWidth = offsetWidth / BASE_WIDTH
        const ratioHeight = offsetHeight / BASE_HEIGHT

        // Activate transition
        clearDisableTransitionTimeout()
        startEnableTransitionTimeout()

        dropdownContainer.style.transform = `translate(${centerPosition}px, ${totalDropdownOffset}px)`
        dropdownContainer.style.width = `${offsetWidth}px`
        dropdownContainer.style.height = `${offsetHeight}px`

        arrow.style.transform = `translate(${
            leftPosition + rect.width / 2
        }px, ${totalDropdownOffset}px) rotate(45deg)`
        background.style.transform = `translate(${centerPosition}px, ${totalDropdownOffset}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`
        backgroundAlt.style.transform = `translateY(${
            _activeContainerItem.content.firstElementChild.offsetHeight / ratioHeight
        }px)`
    }

    function startCloseDropdownTimeout() {
        _closeDropdownTimeout = setTimeout(() => closeDropdown(), 50)
    }

    function clearCloseDropdownTimeout() {
        clearTimeout(_closeDropdownTimeout)
    }

    function startEnableTransitionTimeout() {
        _enableTransitionTimeout = setTimeout(
            () => element.classList.remove("vsm-no-transition"),
            50
        )
    }

    function clearEnableTransitionTimeout() {
        clearTimeout(_enableTransitionTimeout)
    }

    function startDisableTransitionTimeout() {
        _disableTransitionTimeout = setTimeout(
            () => element.classList.add("vsm-no-transition"),
            +transitionTimeout
        )
    }

    function clearDisableTransitionTimeout() {
        clearTimeout(_disableTransitionTimeout)
    }

    function documentEventEndHandler() {
        if (!_isDragging) closeDropdown()
    }

    function registerDropdownElementsEvents(force = false) {
        elementsWithDropdown.forEach(el => {
            // Events have been registered
            if (el._vsmMenu && !force) return

            if (el._vsmMenuHandlers)
                Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
                    el.removeEventListener(eventName, fn)
                })

            if (handler === "hover")
                el._vsmMenuHandlers = {
                    focusin() {
                        clearCloseDropdownTimeout()
                        openDropdown(el)
                    },
                    pointerenter(evt) {
                        if (evt.pointerType !== "touch") {
                            clearCloseDropdownTimeout()
                            openDropdown(el)
                        }
                    },
                    pointerleave(evt) {
                        if (evt.pointerType !== "touch") startCloseDropdownTimeout()
                    }
                }
            else el._vsmMenuHandlers = {}

            el._vsmMenuHandlers.pointerup = evt => {
                evt.preventDefault()
                evt.stopPropagation()
                toggleDropdown(el)
            }

            Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) =>
                el.addEventListener(eventName, fn)
            )

            el._vsmMenu = true
        })
    }

    function registerDropdownContainerEvents(force = false) {
        const el = dropdownContainer

        // Events have been registered
        if (el._vsmMenu && !force) return

        if (el._vsmMenuHandlers)
            Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) =>
                el.removeEventListener(eventName, fn)
            )

        if (handler === "hover")
            el._vsmMenuHandlers = {
                pointerenter: evt => evt.pointerType !== "touch" && clearCloseDropdownTimeout(),

                pointerleave: evt => evt.pointerType !== "touch" && startCloseDropdownTimeout()
            }
        else el._vsmMenuHandlers = {}

        el._vsmMenuHandlers["pointerup"] = evt => evt.stopPropagation()

        Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) =>
            el.addEventListener(eventName, fn)
        )

        el._vsmMenu = true
    }

    function windowResizeHandler() {
        // Recalculates the dropdown only in cases where the screen width changes
        if (_lastWindowWidth === window.innerWidth) return

        _lastWindowWidth = window.innerWidth

        if (_activeDropdown) {
            element.classList.add("vsm-no-transition")
            resizeDropdown()
            return
        }

        // Don't do unnecessary actions
        if (!background.getAttribute("style")) return

        // vsm-no-transition does not apply to dropdown (which has an opacity property),
        // with a long animation you can see unnecessary animation
        element.classList.add("vsm-no-transition", "vsm-no-transition_dropdown")
        setTimeout(() => element.classList.remove("vsm-no-transition_dropdown"))

        // The dropdown position may remain on the right side of the screen,
        // causing a horizontal scroll
        closeDropdown()
        clearAllStyles()
    }

    function updateDataElements() {
        elementsWithDropdown = Array.from(linkContainer.children).filter(el =>
            el.classList.contains("vsm-has-dropdown")
        )

        dropdownContainerItems = Array.from(dropdownContainer.children).map(el => ({
            el,
            name: el.getAttribute("data-dropdown"),
            content: el.firstElementChild
        }))
    }

    function clearAllStyles() {
        dropdownContainer.removeAttribute("style")
        arrow.removeAttribute("style")
        background.removeAttribute("style")
        backgroundAlt.removeAttribute("style")
    }
</script>

<svelte:body on:pointerup={documentEventEndHandler} />
<svelte:window on:resize={windowResizeHandler} />

<header bind:this={element} class="{clazz} vsm-menu vsm-no-transition" {...$$restProps}>
    <nav class="vsm-nav">
        <ul bind:this={root} class="vsm-root">
            <slot name="before-nav" />
            <li bind:this={linkContainer} class="vsm-link-container vsm-mob-hide">
                {#each menu as item, index}
                    <slot name="title" {item} {index} {...createLinkAttributes(item, index)}>
                        <span>{item.title}</span>
                    </slot>
                {/each}
            </li>
            <slot name="after-nav" />
        </ul>
    </nav>
    <div class="vsm-dropdown vsm-mob-hide">
        <div bind:this={background} class="vsm-background">
            <div bind:this={backgroundAlt} class="vsm-background-alt" />
        </div>
        <div bind:this={arrow} class="vsm-arrow" />
        <div bind:this={dropdownContainer} class="vsm-dropdown-container">
            {#each itemsWithDropdown as item, index}
                <div
                    data-dropdown={item?.dropdown}
                    class="vsm-dropdown-section"
                    aria-hidden="false"
                >
                    <div class="vsm-dropdown-content">
                        <slot
                            name="nav-item"
                            {item}
                            {index}
                            active={_activeContainerItem === item}
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
</header>
