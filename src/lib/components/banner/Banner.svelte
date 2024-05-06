<script>
    export let bannerImg = ''
    export let alt = ''
</script>

<div id="banner">
    <picture>
        <source srcset="" type="image/webp" />
        <img src={bannerImg} alt={alt}>
    </picture>
    
</div>


<style>
#banner{
        width: 100%;
    }

    #banner img{
        width: 100%;
    }

    @media (max-width: 768px){
        #banner{
            height: 200px;
        }

        #banner img{
            height: 100%;
        }
    }
</style>